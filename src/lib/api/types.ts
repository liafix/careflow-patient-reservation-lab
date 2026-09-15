import {
  AvailabilitySlot,
  Provider,
  Reservation,
  ReservationDraft,
} from "@/domain";

export interface SearchProvidersInput {
  query?: string;
  city?: string;
  serviceId?: string;
}

export interface GetAvailabilityInput {
  providerId: string;
  serviceId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface CareFlowApi {
  searchProviders(input?: SearchProvidersInput): Promise<Provider[]>;
  getProvider(id: string): Promise<Provider>;
  getAvailability(input: GetAvailabilityInput): Promise<AvailabilitySlot[]>;
  createReservation(input: ReservationDraft): Promise<Reservation>;
  listReservations(): Promise<Reservation[]>;
}
