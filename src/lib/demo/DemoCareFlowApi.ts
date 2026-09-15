import {
  AvailabilitySlot,
  CareFlowApiError,
  Provider,
  Reservation,
  ReservationDraft,
  Service,
} from "@/domain";
import {
  CareFlowApi,
  GetAvailabilityInput,
  SearchProvidersInput,
} from "@/lib/api";
import {
  FIXTURE_PROVIDERS,
  FIXTURE_SERVICES,
  FIXTURE_SLOTS,
} from "./fixtures/mockData";

export type DemoScenario =
  | "normal"
  | "slow"
  | "empty"
  | "error"
  | "slot-conflict";

export interface DemoApiOptions {
  scenario?: DemoScenario;
  delayMs?: number;
}

export class DemoCareFlowApi implements CareFlowApi {
  private scenario: DemoScenario;
  private delayMs: number;
  private providers: Provider[];
  private services: Service[];
  private slots: AvailabilitySlot[];
  private reservations: Reservation[];

  constructor(options: DemoApiOptions = {}) {
    this.scenario = options.scenario ?? "normal";
    this.delayMs = options.delayMs ?? (this.scenario === "slow" ? 200 : 0);
    this.providers = JSON.parse(JSON.stringify(FIXTURE_PROVIDERS));
    this.services = JSON.parse(JSON.stringify(FIXTURE_SERVICES));
    this.slots = JSON.parse(JSON.stringify(FIXTURE_SLOTS));
    this.reservations = [];
  }

  setScenario(scenario: DemoScenario) {
    this.scenario = scenario;
    if (scenario === "slow" && this.delayMs === 0) {
      this.delayMs = 200;
    }
  }

  private async applyDelayAndCheckScenario(): Promise<void> {
    if (this.delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, this.delayMs));
    }

    if (this.scenario === "error") {
      throw new CareFlowApiError(
        "NETWORK_ERROR",
        "Simulated network error in demo mode.",
      );
    }
  }

  async searchProviders(input?: SearchProvidersInput): Promise<Provider[]> {
    await this.applyDelayAndCheckScenario();

    if (this.scenario === "empty") {
      return [];
    }

    let results = [...this.providers];

    if (input?.city) {
      const cityLower = input.city.trim().toLowerCase();
      results = results.filter((p) => p.city.toLowerCase() === cityLower);
    }

    if (input?.serviceId) {
      results = results.filter((p) => p.serviceIds.includes(input.serviceId!));
    }

    if (input?.query) {
      const queryLower = input.query.trim().toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(queryLower) ||
          p.description.toLowerCase().includes(queryLower) ||
          p.address.toLowerCase().includes(queryLower),
      );
    }

    return results;
  }

  async getProvider(id: string): Promise<Provider> {
    await this.applyDelayAndCheckScenario();

    const provider = this.providers.find((p) => p.id === id);
    if (!provider) {
      throw new CareFlowApiError(
        "NOT_FOUND",
        `Provider with ID '${id}' was not found.`,
        { providerId: id },
      );
    }

    return provider;
  }

  async getAvailability(
    input: GetAvailabilityInput,
  ): Promise<AvailabilitySlot[]> {
    await this.applyDelayAndCheckScenario();

    if (this.scenario === "empty") {
      return [];
    }

    let results = this.slots.filter((s) => s.providerId === input.providerId);

    if (input.serviceId) {
      results = results.filter((s) => s.serviceId === input.serviceId);
    }

    if (input.dateFrom) {
      const from = new Date(input.dateFrom).getTime();
      results = results.filter((s) => new Date(s.startsAt).getTime() >= from);
    }

    if (input.dateTo) {
      const to = new Date(input.dateTo).getTime();
      results = results.filter((s) => new Date(s.startsAt).getTime() <= to);
    }

    return results;
  }

  async createReservation(input: ReservationDraft): Promise<Reservation> {
    await this.applyDelayAndCheckScenario();

    if (!input.firstName?.trim() || !input.email?.trim()) {
      throw new CareFlowApiError(
        "VALIDATION_ERROR",
        "First name and email are required to create a reservation.",
      );
    }

    if (this.scenario === "slot-conflict") {
      throw new CareFlowApiError(
        "SLOT_UNAVAILABLE",
        "The requested time slot is no longer available.",
        { slotId: input.slotId },
      );
    }

    const provider = this.providers.find((p) => p.id === input.providerId);
    if (!provider) {
      throw new CareFlowApiError(
        "NOT_FOUND",
        `Provider with ID '${input.providerId}' not found.`,
      );
    }

    const service = this.services.find((s) => s.id === input.serviceId);
    if (!service) {
      throw new CareFlowApiError(
        "NOT_FOUND",
        `Service with ID '${input.serviceId}' not found.`,
      );
    }

    const slot = this.slots.find(
      (s) => s.id === input.slotId && s.providerId === input.providerId,
    );
    if (!slot) {
      throw new CareFlowApiError(
        "NOT_FOUND",
        `Slot with ID '${input.slotId}' not found for provider.`,
      );
    }

    if (slot.status !== "available") {
      throw new CareFlowApiError(
        "SLOT_UNAVAILABLE",
        "The selected slot is already reserved or unavailable.",
        { slotId: input.slotId },
      );
    }

    // Mark slot as reserved
    slot.status = "reserved";

    const reservation: Reservation = {
      id: `res-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      provider: {
        id: provider.id,
        name: provider.name,
        city: provider.city,
        address: provider.address,
      },
      service: {
        id: service.id,
        name: service.name,
        category: service.category,
        durationMinutes: service.durationMinutes,
      },
      startsAt: slot.startsAt,
      firstName: input.firstName.trim(),
      email: input.email.trim(),
      phone: input.phone?.trim(),
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    this.reservations.push(reservation);
    return reservation;
  }

  async listReservations(): Promise<Reservation[]> {
    await this.applyDelayAndCheckScenario();

    if (this.scenario === "empty") {
      return [];
    }

    return [...this.reservations];
  }
}
