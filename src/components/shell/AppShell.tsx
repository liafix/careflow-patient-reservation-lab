"use client";

import React from "react";
import { CareFlowApiProvider } from "@/lib/api";
import { Header } from "./Header";
import { Disclaimer } from "./Disclaimer";

export interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <CareFlowApiProvider>
      <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 font-sans antialiased">
        <Header />
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer>
          <Disclaimer />
        </footer>
      </div>
    </CareFlowApiProvider>
  );
}
