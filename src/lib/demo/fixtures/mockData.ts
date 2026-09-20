import { AvailabilitySlot, Provider, Service } from "@/domain";

export const FIXTURE_SERVICES: Service[] = [
  {
    id: "srv-preventive",
    name: "Preventívna konzultácia",
    category: "Všeobecná starostlivosť",
    description: "Základná preventívna prehliadka a konzultácia zdravotného stavu.",
    durationMinutes: 30,
  },
  {
    id: "srv-general",
    name: "Všeobecná konzultácia",
    category: "Všeobecná starostlivosť",
    description: "Konzultácia bežných zdravotných ťažkostí a vystavenie odporúčaní.",
    durationMinutes: 20,
  },
  {
    id: "srv-checkup",
    name: "Kontrolná návšteva",
    category: "Následná starostlivosť",
    description: "Následná kontrola po absolvovanej liečbe alebo vyšetrení.",
    durationMinutes: 15,
  },
  {
    id: "srv-dental",
    name: "Zubná konzultácia",
    category: "Stomatológia",
    description: "Preventívna prehliadka chrupu a konzultácia ústnej hygieny.",
    durationMinutes: 30,
  },
];

export const FIXTURE_PROVIDERS: Provider[] = [
  {
    id: "prv-central",
    name: "Central Care Clinic",
    city: "Bratislava",
    address: "Mlynské nivy 44, 821 09 Bratislava",
    description: "Moderné centrum preventívnej a všeobecnej zdravotnej starostlivosti.",
    serviceIds: ["srv-preventive", "srv-general", "srv-checkup"],
  },
  {
    id: "prv-river",
    name: "River Health Point",
    city: "Bratislava",
    address: "Dvořákovo nábrežie 10, 811 02 Bratislava",
    description: "Poliklinika zameraná na celostnú diagnostiku a zubnú starostlivosť.",
    serviceIds: ["srv-general", "srv-dental"],
  },
  {
    id: "prv-northside",
    name: "Northside Medical Centre",
    city: "Košice",
    address: "Hlavná 88, 040 01 Košice",
    description: "Komplexné zdravotnícke zariadenie pre celú rodinu v Košiciach.",
    serviceIds: ["srv-preventive", "srv-general", "srv-checkup", "srv-dental"],
  },
];

export const FIXTURE_SLOTS: AvailabilitySlot[] = [
  {
    id: "slot-101",
    providerId: "prv-central",
    serviceId: "srv-preventive",
    startsAt: "2026-10-15T08:00:00Z",
    durationMinutes: 30,
    status: "available",
  },
  {
    id: "slot-102",
    providerId: "prv-central",
    serviceId: "srv-preventive",
    startsAt: "2026-10-15T09:00:00Z",
    durationMinutes: 30,
    status: "available",
  },
  {
    id: "slot-103",
    providerId: "prv-central",
    serviceId: "srv-general",
    startsAt: "2026-10-15T10:00:00Z",
    durationMinutes: 20,
    status: "available",
  },
  {
    id: "slot-104",
    providerId: "prv-central",
    serviceId: "srv-preventive",
    startsAt: "2026-10-15T11:00:00Z",
    durationMinutes: 30,
    status: "reserved",
  },
  {
    id: "slot-201",
    providerId: "prv-river",
    serviceId: "srv-dental",
    startsAt: "2026-10-16T13:00:00Z",
    durationMinutes: 30,
    status: "available",
  },
  {
    id: "slot-202",
    providerId: "prv-river",
    serviceId: "srv-general",
    startsAt: "2026-10-16T14:00:00Z",
    durationMinutes: 20,
    status: "available",
  },
  {
    id: "slot-301",
    providerId: "prv-northside",
    serviceId: "srv-checkup",
    startsAt: "2026-10-17T09:30:00Z",
    durationMinutes: 15,
    status: "available",
  },
];
