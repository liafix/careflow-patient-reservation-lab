import React from "react";

export function Disclaimer() {
  return (
    <aside
      className="border-t border-slate-200 bg-slate-50/90 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-600"
      aria-label="Projektový disclaimer"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2 max-w-4xl">
          <span className="inline-block mt-0.5 px-1.5 py-0.5 bg-slate-200 text-slate-700 font-semibold rounded text-[10px] tracking-wide uppercase shrink-0">
            Demo
          </span>
          <p className="leading-relaxed">
            <strong>Nezávislý kandidátsky projekt.</strong> CareFlow používa výhradne syntetické dáta.
            Nie je oficiálnym produktom spoločnosti Počítače a Programovanie a nereprezentuje ani
            nereprodukuje jej interné systémy, architektúru, API alebo dáta.
          </p>
        </div>
        <div className="text-slate-400 font-mono text-[11px] shrink-0">
          CareFlow Lab &bull; Pass 2
        </div>
      </div>
    </aside>
  );
}
