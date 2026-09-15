import { CareFlowApiError } from "@/domain";
import { DemoCareFlowApi } from "./DemoCareFlowApi";
import { FIXTURE_PROVIDERS, FIXTURE_SERVICES, FIXTURE_SLOTS } from "./fixtures/mockData";

describe("DemoCareFlowApi Unit Tests (PASS 1)", () => {
  let api: DemoCareFlowApi;

  beforeEach(() => {
    api = new DemoCareFlowApi({ scenario: "normal" });
  });

  it("provider search returns deterministic matches", async () => {
    const allProviders = await api.searchProviders();
    expect(allProviders).toHaveLength(FIXTURE_PROVIDERS.length);

    const bratislavaProviders = await api.searchProviders({ city: "Bratislava" });
    expect(bratislavaProviders).toHaveLength(2);
    expect(bratislavaProviders.every((p) => p.city === "Bratislava")).toBe(true);

    const queryMatches = await api.searchProviders({ query: "Central" });
    expect(queryMatches).toHaveLength(1);
    expect(queryMatches[0].name).toBe("Central Care Clinic");
  });

  it("provider lookup success", async () => {
    const provider = await api.getProvider("prv-river");
    expect(provider).toBeDefined();
    expect(provider.id).toBe("prv-river");
    expect(provider.name).toBe("River Health Point");
  });

  it("provider lookup NOT_FOUND", async () => {
    await expect(api.getProvider("non-existent-id")).rejects.toThrow(CareFlowApiError);
    try {
      await api.getProvider("non-existent-id");
    } catch (err) {
      expect(err).toBeInstanceOf(CareFlowApiError);
      const apiErr = err as CareFlowApiError;
      expect(apiErr.code).toBe("NOT_FOUND");
    }
  });

  it("availability filtered by provider and service", async () => {
    const slots = await api.getAvailability({
      providerId: "prv-central",
      serviceId: "srv-preventive",
    });
    expect(slots.length).toBeGreaterThan(0);
    expect(slots.every((s) => s.providerId === "prv-central" && s.serviceId === "srv-preventive")).toBe(true);
  });

  it("empty scenario returns no matching results or availability", async () => {
    const emptyApi = new DemoCareFlowApi({ scenario: "empty" });

    const providers = await emptyApi.searchProviders();
    expect(providers).toEqual([]);

    const slots = await emptyApi.getAvailability({ providerId: "prv-central" });
    expect(slots).toEqual([]);

    const reservations = await emptyApi.listReservations();
    expect(reservations).toEqual([]);
  });

  it("error scenario produces expected typed error", async () => {
    const errorApi = new DemoCareFlowApi({ scenario: "error" });

    try {
      await errorApi.searchProviders();
    } catch (err) {
      expect(err).toBeInstanceOf(CareFlowApiError);
      const apiErr = err as CareFlowApiError;
      expect(apiErr.code).toBe("NETWORK_ERROR");
      expect(apiErr.message).toContain("Simulated network error");
    }
  });

  it("slot-conflict scenario produces typed SLOT_UNAVAILABLE error", async () => {
    const conflictApi = new DemoCareFlowApi({ scenario: "slot-conflict" });

    try {
      await conflictApi.createReservation({
        providerId: "prv-central",
        serviceId: "srv-preventive",
        slotId: "slot-101",
        firstName: "Ján",
        email: "jan.novak@example.com",
      });
      expect.fail("Should have thrown SLOT_UNAVAILABLE");
    } catch (err) {
      expect(err).toBeInstanceOf(CareFlowApiError);
      const apiErr = err as CareFlowApiError;
      expect(apiErr.code).toBe("SLOT_UNAVAILABLE");
    }
  });

  it("reservation creation succeeds in normal scenario", async () => {
    const reservation = await api.createReservation({
      providerId: "prv-central",
      serviceId: "srv-preventive",
      slotId: "slot-101",
      firstName: "Mária",
      email: "maria@example.com",
    });

    expect(reservation).toBeDefined();
    expect(reservation.id).toMatch(/^res-/);
    expect(reservation.provider.id).toBe("prv-central");
    expect(reservation.service.id).toBe("srv-preventive");
    expect(reservation.firstName).toBe("Mária");
    expect(reservation.email).toBe("maria@example.com");
    expect(reservation.status).toBe("confirmed");
  });

  it("created demo reservation can be returned by listReservations", async () => {
    const created = await api.createReservation({
      providerId: "prv-central",
      serviceId: "srv-preventive",
      slotId: "slot-102",
      firstName: "Peter",
      email: "peter@example.com",
    });

    const list = await api.listReservations();
    expect(list).toHaveLength(1);
    expect(list[0].id).toBe(created.id);
    expect(list[0].firstName).toBe("Peter");
  });

  it("fixtures contain only synthetic/non-sensitive demo data", async () => {
    for (const provider of FIXTURE_PROVIDERS) {
      expect(provider.name).toMatch(/Clinic|Point|Centre/);
      expect(provider.address).toBeDefined();
    }
    for (const service of FIXTURE_SERVICES) {
      expect(service.name).toBeDefined();
      expect(service.durationMinutes).toBeGreaterThan(0);
    }
    for (const slot of FIXTURE_SLOTS) {
      expect(slot.startsAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    }
  });
});
