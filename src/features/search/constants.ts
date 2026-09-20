export const CITY_OPTIONS = [
  { value: "", label: "Všetky mestá" },
  { value: "Bratislava", label: "Bratislava" },
  { value: "Košice", label: "Košice" },
];

export const SERVICE_OPTIONS = [
  { value: "", label: "Všetky služby" },
  { value: "srv-preventive", label: "Preventívna konzultácia" },
  { value: "srv-general", label: "Všeobecná konzultácia" },
  { value: "srv-checkup", label: "Kontrolná návšteva" },
  { value: "srv-dental", label: "Zubná konzultácia" },
];

export const SERVICE_NAME_MAP: Record<string, string> = {
  "srv-preventive": "Preventívna konzultácia",
  "srv-general": "Všeobecná konzultácia",
  "srv-checkup": "Kontrolná návšteva",
  "srv-dental": "Zubná konzultácia",
};
