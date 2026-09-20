import React from "react";
import { render, screen } from "@testing-library/react";
import { AppShell } from "./AppShell";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("AppShell", () => {
  it("renders the CareFlow brand header, navigation, content, footer, and disclaimer", () => {
    render(
      <AppShell>
        <div data-testid="test-content">Test Page Content</div>
      </AppShell>
    );

    expect(screen.getByText("CareFlow")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Hlavná navigácia" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Domov" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Vyhľadávanie" })).toBeInTheDocument();
    expect(screen.getByText("Moje rezervácie")).toBeInTheDocument();
    expect(screen.getByTestId("test-content")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument(); // <footer> has role contentinfo
    expect(screen.getByText(/Nezávislý kandidátsky projekt/i)).toBeInTheDocument();
    expect(screen.getByText(/syntetické dáta/i)).toBeInTheDocument();
  });
});
