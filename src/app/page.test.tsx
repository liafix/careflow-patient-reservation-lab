import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("CareFlow Pass 0 landing page", () => {
  it("renders the candidate-project identity and truthfulness disclaimer", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: "CareFlow" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/synthetic data only/i)).toBeInTheDocument();
    expect(
      screen.getByText(/not an official product of Počítače a Programovanie/i),
    ).toBeInTheDocument();
  });
});
