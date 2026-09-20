import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CareFlowApiProvider } from "@/lib/api";
import { CareFlowApiError, Provider } from "@/domain";
import { SearchClient } from "./SearchClient";

// Mocks for next/navigation
const mockPush = vi.fn();
let mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParams,
}));

describe("SearchClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams();
  });

  const sampleProviders: Provider[] = [
    {
      id: "prv-central",
      name: "Central Care Clinic",
      city: "Bratislava",
      address: "Mlynské nivy 44, Bratislava",
      description: "Moderné centrum preventívnej starostlivosti.",
      serviceIds: ["srv-preventive"],
    },
  ];

  it("starts in idle state on clean /search and does NOT invoke CareFlowApi", () => {
    const mockApi = {
      searchProviders: vi.fn().mockResolvedValue(sampleProviders),
      getProvider: vi.fn(),
      getAvailability: vi.fn(),
      createReservation: vi.fn(),
      listReservations: vi.fn(),
    };

    render(
      <CareFlowApiProvider api={mockApi}>
        <SearchClient />
      </CareFlowApiProvider>
    );

    expect(screen.getByText("Zadajte vyhľadávacie kritériá")).toBeInTheDocument();
    expect(mockApi.searchProviders).not.toHaveBeenCalled();
  });

  it("executes search automatically when URL contains search parameters", async () => {
    mockSearchParams = new URLSearchParams("q=consultation&city=Bratislava&serviceId=srv-preventive");

    const mockApi = {
      searchProviders: vi.fn().mockResolvedValue(sampleProviders),
      getProvider: vi.fn(),
      getAvailability: vi.fn(),
      createReservation: vi.fn(),
      listReservations: vi.fn(),
    };

    render(
      <CareFlowApiProvider api={mockApi}>
        <SearchClient />
      </CareFlowApiProvider>
    );

    await waitFor(() => {
      expect(mockApi.searchProviders).toHaveBeenCalledWith({
        query: "consultation",
        city: "Bratislava",
        serviceId: "srv-preventive",
      });
    });

    expect(screen.getByText("Central Care Clinic")).toBeInTheDocument();
    expect(screen.getByLabelText("Kľúčové slovo")).toHaveValue("consultation");
    expect(screen.getByLabelText("Mesto")).toHaveValue("Bratislava");
    expect(screen.getByLabelText("Služba")).toHaveValue("srv-preventive");
  });

  it("submitting search updates URL via router.push", () => {
    const mockApi = {
      searchProviders: vi.fn().mockResolvedValue(sampleProviders),
      getProvider: vi.fn(),
      getAvailability: vi.fn(),
      createReservation: vi.fn(),
      listReservations: vi.fn(),
    };

    render(
      <CareFlowApiProvider api={mockApi}>
        <SearchClient />
      </CareFlowApiProvider>
    );

    fireEvent.change(screen.getByLabelText("Kľúčové slovo"), {
      target: { value: "River" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Vyhľadať" }));

    expect(mockPush).toHaveBeenCalledWith("/search?q=River");
  });

  it("renders accessible empty state when search returns no providers", async () => {
    mockSearchParams = new URLSearchParams("q=nonexistent");

    const mockApi = {
      searchProviders: vi.fn().mockResolvedValue([]),
      getProvider: vi.fn(),
      getAvailability: vi.fn(),
      createReservation: vi.fn(),
      listReservations: vi.fn(),
    };

    render(
      <CareFlowApiProvider api={mockApi}>
        <SearchClient />
      </CareFlowApiProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Žiadni poskytovatelia neboli nájdení")).toBeInTheDocument();
    });
  });

  it("renders accessible typed error state when CareFlowApi throws CareFlowApiError", async () => {
    mockSearchParams = new URLSearchParams("q=test");

    const mockApi = {
      searchProviders: vi
        .fn()
        .mockRejectedValue(new CareFlowApiError("NETWORK_ERROR", "Chyba siete v demo režime")),
      getProvider: vi.fn(),
      getAvailability: vi.fn(),
      createReservation: vi.fn(),
      listReservations: vi.fn(),
    };

    render(
      <CareFlowApiProvider api={mockApi}>
        <SearchClient />
      </CareFlowApiProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    expect(screen.getByText("Chyba pri vyhľadávaní")).toBeInTheDocument();
    expect(screen.getByText("NETWORK_ERROR")).toBeInTheDocument();
    expect(screen.getByText("Chyba siete v demo režime")).toBeInTheDocument();
  });

  it("renders generic Slovak user-safe error message for non-CareFlowApi errors", async () => {
    mockSearchParams = new URLSearchParams("q=test");

    const mockApi = {
      searchProviders: vi.fn().mockRejectedValue(new Error("Database explosion secret details")),
      getProvider: vi.fn(),
      getAvailability: vi.fn(),
      createReservation: vi.fn(),
      listReservations: vi.fn(),
    };

    render(
      <CareFlowApiProvider api={mockApi}>
        <SearchClient />
      </CareFlowApiProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    expect(screen.getByText("Vyskytla sa neočakávaná chyba. Skúste to znova neskôr.")).toBeInTheDocument();
    expect(screen.queryByText("Database explosion secret details")).not.toBeInTheDocument();
  });
});
