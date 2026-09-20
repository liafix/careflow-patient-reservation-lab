"use client";

import React from "react";
import { Provider } from "@/domain";
import { SERVICE_NAME_MAP } from "./constants";

export type SearchStatus = "idle" | "loading" | "success" | "empty" | "error";

export interface SearchResultsProps {
  status: SearchStatus;
  providers: Provider[];
  errorMessage?: string;
  errorCode?: string;
}

export function SearchResults({
  status,
  providers,
  errorMessage,
  errorCode,
}: SearchResultsProps) {
  if (status === "loading") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-50 text-teal-700 animate-pulse">
          <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
        <p className="text-slate-700 font-semibold text-base">
          Vyhľadávam dostupných poskytovateľov...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2"
      >
        <div className="flex items-center gap-2 font-bold text-rose-800 text-base">
          <svg className="w-5 h-5 shrink-0 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Chyba pri vyhľadávaní</span>
          {errorCode && (
            <span className="text-xs px-2 py-0.5 font-mono bg-rose-100 text-rose-700 rounded border border-rose-200">
              {errorCode}
            </span>
          )}
        </div>
        <p className="text-sm text-rose-700 leading-relaxed">
          {errorMessage || "Nepodarilo sa načítať poskytovateľov. Skontrolujte svoje pripojenie a skúste to znova."}
        </p>
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-500 font-bold text-xl">
          🔍
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          Žiadni poskytovatelia neboli nájdení
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Zadaným vyhľadávacím kritériám nezodpovedá žiadny poskytovateľ. Skúste upraviť kľúčové slovo alebo vynulovať filtre.
        </p>
      </div>
    );
  }

  if (status === "success" && providers.length > 0) {
    return (
      <div className="space-y-4">
        <div
          role="status"
          aria-live="polite"
          className="flex items-center justify-between text-sm text-slate-600 font-medium px-1"
        >
          <span>
            Nájdení poskytovatelia: <strong className="text-slate-900">{providers.length}</strong>
          </span>
        </div>

        <ul className="grid grid-cols-1 gap-4" aria-label="Zoznam poskytovateľov">
          {providers.map((provider) => (
            <li
              key={provider.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      {provider.name}
                    </h3>
                    <span className="px-2.5 py-0.5 bg-teal-50 text-teal-800 border border-teal-200/60 font-semibold text-xs rounded-full">
                      {provider.city}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    <span>📍</span>
                    <span>{provider.address}</span>
                  </p>
                </div>

                {/* PASS 2 boundary: Detail button is intentionally unavailable/planned */}
                <div className="shrink-0">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-400 font-medium text-xs cursor-not-allowed border border-slate-200"
                    title="Detail poskytovateľa bude dostupný v neskoršej fáze (PASS 3)"
                    aria-disabled="true"
                  >
                    <span>Detail (Pripravujeme)</span>
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {provider.description}
              </p>

              {/* Service tags */}
              {provider.serviceIds && provider.serviceIds.length > 0 && (
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-slate-500 font-semibold mr-1">
                    Poskytované služby:
                  </span>
                  {provider.serviceIds.map((srvId) => (
                    <span
                      key={srvId}
                      className="px-2 py-0.5 bg-slate-100 text-slate-700 font-medium text-xs rounded-md border border-slate-200"
                    >
                      {SERVICE_NAME_MAP[srvId] || srvId}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}
