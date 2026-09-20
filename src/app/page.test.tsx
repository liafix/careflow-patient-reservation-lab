import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./page";
import { AppShell } from "@/components/shell";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("CareFlow Landing Page", () => {
  it("renders the landing page heading and CTA link to search", () => {
    render(
      <AppShell>
        <Home />
      </AppShell>
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /Rezervácie zdravotnej starostlivosti/i })
    ).toBeInTheDocument();

    const searchCta = screen.getByRole("link", { name: /Vyhľadať poskytovateľa/i });
    expect(searchCta).toBeInTheDocument();
    expect(searchCta).toHaveAttribute("href", "/search");
  });

  it("renders truthfulness disclaimer in the shell layout", () => {
    render(
      <AppShell>
        <Home />
      </AppShell>
    );

    expect(screen.getByText(/Nezávislý kandidátsky projekt/i)).toBeInTheDocument();
    expect(screen.getByText(/syntetické dáta/i)).toBeInTheDocument();
    expect(screen.getByText(/Počítače a Programovanie/i)).toBeInTheDocument();
  });
});
