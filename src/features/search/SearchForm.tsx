"use client";

import React, { useState, useEffect } from "react";
import { CITY_OPTIONS, SERVICE_OPTIONS } from "./constants";
import { SearchFormValues } from "./types";

export interface SearchFormProps {
  initialValues: SearchFormValues;
  onSubmit: (values: SearchFormValues) => void;
  onReset: () => void;
  isLoading?: boolean;
}

export function SearchForm({
  initialValues,
  onSubmit,
  onReset,
  isLoading = false,
}: SearchFormProps) {
  const [q, setQ] = useState(initialValues.q);
  const [city, setCity] = useState(initialValues.city);
  const [serviceId, setServiceId] = useState(initialValues.serviceId);

  // Sync state when URL-derived initialValues change
  useEffect(() => {
    setQ(initialValues.q);
    setCity(initialValues.city);
    setServiceId(initialValues.serviceId);
  }, [initialValues.q, initialValues.city, initialValues.serviceId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ q, city, serviceId });
  };

  const handleReset = () => {
    setQ("");
    setCity("");
    setServiceId("");
    onReset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5"
      aria-label="Formulár vyhľadávania poskytovateľov"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Text Query Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="search-query"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700"
          >
            Kľúčové slovo
          </label>
          <div className="relative">
            <input
              id="search-query"
              name="q"
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Názov, poliklinika alebo popis..."
              className="w-full pl-3 pr-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus-visible:outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* City Filter Select */}
        <div className="space-y-1.5">
          <label
            htmlFor="search-city"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700"
          >
            Mesto
          </label>
          <select
            id="search-city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus-visible:outline-none transition-all"
          >
            {CITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Service Filter Select */}
        <div className="space-y-1.5">
          <label
            htmlFor="search-service"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700"
          >
            Služba
          </label>
          <select
            id="search-service"
            name="serviceId"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus-visible:outline-none transition-all"
          >
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-slate-100">
        {(q || city || serviceId) && (
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-teal-600"
          >
            Vynulovať filtre
          </button>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:bg-teal-300 text-white font-bold text-sm shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-teal-800"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Vyhľadávam...</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>Vyhľadať</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
