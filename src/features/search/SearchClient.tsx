"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CareFlowApiError, Provider } from "@/domain";
import { useCareFlowApi } from "@/lib/api";
import { SearchForm } from "./SearchForm";
import { SearchResults, SearchStatus } from "./SearchResults";
import { SearchFormValues } from "./types";

export function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const api = useCareFlowApi();

  const [status, setStatus] = useState<SearchStatus>("idle");
  const [providers, setProviders] = useState<Provider[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [errorCode, setErrorCode] = useState<string | undefined>();

  // Extract current search values from URL query parameters
  const currentValues: SearchFormValues = {
    q: searchParams.get("q") ?? "",
    city: searchParams.get("city") ?? "",
    serviceId: searchParams.get("serviceId") ?? "",
  };

  const hasSearchParams = Array.from(searchParams.keys()).length > 0;

  const executeSearch = useCallback(
    async (values: SearchFormValues) => {
      setStatus("loading");
      setErrorMessage(undefined);
      setErrorCode(undefined);

      try {
        const results = await api.searchProviders({
          query: values.q || undefined,
          city: values.city || undefined,
          serviceId: values.serviceId || undefined,
        });

        setProviders(results);
        if (results.length === 0) {
          setStatus("empty");
        } else {
          setStatus("success");
        }
      } catch (err: unknown) {
        if (err instanceof CareFlowApiError) {
          setErrorMessage(err.message);
          setErrorCode(err.code);
        } else {
          // Generic user-safe message for non-CareFlowApi error to prevent raw error leaks
          setErrorMessage("Vyskytla sa neočakávaná chyba. Skúste to znova neskôr.");
          setErrorCode(undefined);
        }
        setProviders([]);
        setStatus("error");
      }
    },
    [api],
  );

  useEffect(() => {
    if (hasSearchParams) {
      executeSearch(currentValues);
    } else {
      setStatus("idle");
      setProviders([]);
      setErrorMessage(undefined);
      setErrorCode(undefined);
    }
  }, [searchParams, hasSearchParams, executeSearch]);

  const handleSubmit = (values: SearchFormValues) => {
    const params = new URLSearchParams();
    if (values.q.trim()) params.set("q", values.q.trim());
    if (values.city) params.set("city", values.city);
    if (values.serviceId) params.set("serviceId", values.serviceId);

    // If form is submitted without any filter, set 'submitted=true' so URL reflects explicit search
    if (Array.from(params.keys()).length === 0) {
      params.set("submitted", "true");
    }

    const queryString = params.toString();
    router.push(`/search?${queryString}`);
  };

  const handleReset = () => {
    router.push("/search");
  };

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Vyhľadávanie poskytovateľov
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Vyhľadajte lekárov a zdravotnícke zariadenia podľa názvu, mesta alebo ponúkaných služieb.
        </p>
      </div>

      {/* Form */}
      <SearchForm
        initialValues={currentValues}
        onSubmit={handleSubmit}
        onReset={handleReset}
        isLoading={status === "loading"}
      />

      {/* Results */}
      <SearchResults
        status={status}
        providers={providers}
        errorMessage={errorMessage}
        errorCode={errorCode}
      />
    </div>
  );
}
