"use client";

import React, { createContext, useContext, useMemo } from "react";
import { CareFlowApi } from "./types";
import { DemoCareFlowApi } from "../demo/DemoCareFlowApi";

const CareFlowApiContext = createContext<CareFlowApi | null>(null);

export interface CareFlowApiProviderProps {
  api?: CareFlowApi;
  children: React.ReactNode;
}

export function CareFlowApiProvider({ api, children }: CareFlowApiProviderProps) {
  const apiInstance = useMemo(() => api ?? new DemoCareFlowApi(), [api]);

  return (
    <CareFlowApiContext.Provider value={apiInstance}>
      {children}
    </CareFlowApiContext.Provider>
  );
}

export function useCareFlowApi(): CareFlowApi {
  const context = useContext(CareFlowApiContext);
  if (!context) {
    // Fallback to a default instance if provider is missing
    return new DemoCareFlowApi();
  }
  return context;
}
