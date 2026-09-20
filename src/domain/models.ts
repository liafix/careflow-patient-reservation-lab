export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  durationMinutes: number;
}

export interface Provider {
  id: string;
  name: string;
  city: string;
  address: string;
  description: string;
  serviceIds: string[];
}

export type SlotStatus = "available" | "reserved" | "blocked";

export interface AvailabilitySlot {
  id: string;
  providerId: string;
  serviceId: string;
  startsAt: string; // ISO 8601 string representation of date/time
  durationMinutes: number;
  status: SlotStatus;
}

export interface ReservationDraft {
  providerId: string;
  serviceId: string;
  slotId: string;
  firstName: string;
  email: string;
  phone?: string;
}

export type ReservationStatus = "confirmed" | "cancelled";

export interface ProviderSnapshot {
  id: string;
  name: string;
  city: string;
  address: string;
}

export interface ServiceSnapshot {
  id: string;
  name: string;
  category: string;
  durationMinutes: number;
}

export interface Reservation {
  id: string;
  provider: ProviderSnapshot;
  service: ServiceSnapshot;
  startsAt: string;
  firstName: string;
  email: string;
  phone?: string;
  status: ReservationStatus;
  createdAt: string;
}
