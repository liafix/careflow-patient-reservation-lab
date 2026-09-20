import React, { Suspense } from "react";
import { SearchClient } from "@/features/search";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div
          role="status"
          aria-live="polite"
          className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3"
        >
          <p className="text-slate-700 font-semibold text-base">
            Načítavam vyhľadávanie...
          </p>
        </div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
