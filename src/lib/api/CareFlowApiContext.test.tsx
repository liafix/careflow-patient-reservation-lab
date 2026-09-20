import React from "react";
import { renderHook } from "@testing-library/react";
import { CareFlowApiProvider, useCareFlowApi } from "./CareFlowApiContext";
import { CareFlowApi } from "./types";
import { DemoCareFlowApi } from "../demo/DemoCareFlowApi";

describe("CareFlowApiContext", () => {
  it("provides default DemoCareFlowApi when no custom api is passed", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CareFlowApiProvider>{children}</CareFlowApiProvider>
    );

    const { result } = renderHook(() => useCareFlowApi(), { wrapper });
    expect(result.current).toBeInstanceOf(DemoCareFlowApi);
  });

  it("provides custom CareFlowApi when passed to provider", () => {
    const mockApi: CareFlowApi = {
      searchProviders: vi.fn(),
      getProvider: vi.fn(),
      getAvailability: vi.fn(),
      createReservation: vi.fn(),
      listReservations: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CareFlowApiProvider api={mockApi}>{children}</CareFlowApiProvider>
    );

    const { result } = renderHook(() => useCareFlowApi(), { wrapper });
    expect(result.current).toBe(mockApi);
  });
});
