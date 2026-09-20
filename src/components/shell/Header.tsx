"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-teal-600 rounded-md p-1 -m-1"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:bg-teal-800 transition-colors">
                +
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                  CareFlow
                </span>
                <span className="text-xs text-slate-500 font-medium hidden sm:block leading-none">
                  Patient Reservation Lab
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Hlavná navigácia">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-teal-600 ${
                isActive("/")
                  ? "bg-teal-50 text-teal-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
              aria-current={isActive("/") ? "page" : undefined}
            >
              Domov
            </Link>

            <Link
              href="/search"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-teal-600 ${
                isActive("/search")
                  ? "bg-teal-50 text-teal-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
              aria-current={isActive("/search") ? "page" : undefined}
            >
              Vyhľadávanie
            </Link>

            {/* Visually disabled / planned navigation item for PASS 7 scope */}
            <div
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-400 cursor-not-allowed flex items-center gap-1.5 opacity-75"
              aria-disabled="true"
              title="Funkcia Moje rezervácie bude dostupná v neskoršej fáze (PASS 7)"
            >
              <span>Moje rezervácie</span>
              <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200">
                Pripravujeme
              </span>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-teal-600"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Zatvoriť menu" : "Otvoriť menu"}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/") ? "bg-teal-50 text-teal-800" : "text-slate-700 hover:bg-slate-50"
            }`}
            aria-current={isActive("/") ? "page" : undefined}
          >
            Domov
          </Link>
          <Link
            href="/search"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/search") ? "bg-teal-50 text-teal-800" : "text-slate-700 hover:bg-slate-50"
            }`}
            aria-current={isActive("/search") ? "page" : undefined}
          >
            Vyhľadávanie
          </Link>
          <div
            className="px-3 py-2 text-base font-medium text-slate-400 flex items-center justify-between"
            aria-disabled="true"
          >
            <span>Moje rezervácie</span>
            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200">
              Pripravujeme
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
