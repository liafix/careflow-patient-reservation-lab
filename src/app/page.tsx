import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white p-8 sm:p-12 shadow-xl"
      >
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 text-xs font-semibold tracking-wide border border-teal-400/30">
            <span>Kandidátsky demonstrator</span>
            <span>&bull;</span>
            <span>PASS 2: Search UI</span>
          </div>

          <h1
            id="hero-heading"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            Rezervácie zdravotnej starostlivosti s istotou a ľahkosťou
          </h1>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            CareFlow — Patient Reservation Frontend Lab je demonstrátor moderného používateľského
            rozhrania pre vyhľadávanie a rezerváciu termínov u poskytovateľov zdravotnej starostlivosti.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-teal-950 font-bold text-base shadow-md transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              <span>Vyhľadať poskytovateľa</span>
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Lab Features Grid */}
      <section aria-labelledby="features-heading" className="space-y-6">
        <div className="space-y-2">
          <h2 id="features-heading" className="text-2xl font-bold text-slate-900 tracking-tight">
            Kľúčové vlastnosti demonstrátora
          </h2>
          <p className="text-slate-600 text-sm">
            Architektúra pripravená na škálovanie a integráciu s produkčným rozhraním.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              🔍
            </div>
            <h3 className="font-bold text-slate-900 text-lg">URL-backed vyhľadávanie</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Stav vyhľadávania je plne synchronizovaný s URL parametrami (`q`, `city`, `serviceId`),
              čo umožňuje zdieľanie odkazov a fungovanie späť/dopredu v prehliadači.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              🛡️
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Typované API rozhranie</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Používateľské rozhranie komunikuje výhradne cez abstraktné rozhranie `CareFlowApi`,
              oddelené od konkrétnych dátových fixtures.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              ♿
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Prístupnosť (a11y)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Semantické HTML, viditeľné focus stavy, navigačné klávesové skratky a oznamy stavov
              prostredníctvom ARIA live regions pre čítačky obrazovky.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
