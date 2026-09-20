import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchForm } from "./SearchForm";

describe("SearchForm", () => {
  const defaultInitialValues = { q: "", city: "", serviceId: "" };

  it("renders search form controls accessibly with associated labels", () => {
    render(
      <SearchForm
        initialValues={defaultInitialValues}
        onSubmit={vi.fn()}
        onReset={vi.fn()}
      />
    );

    expect(screen.getByRole("form", { name: "Formulár vyhľadávania poskytovateľov" })).toBeInTheDocument();
    expect(screen.getByLabelText("Kľúčové slovo")).toBeInTheDocument();
    expect(screen.getByLabelText("Mesto")).toBeInTheDocument();
    expect(screen.getByLabelText("Služba")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Vyhľadať" })).toBeInTheDocument();
  });

  it("initializes form state with provided initial values", () => {
    render(
      <SearchForm
        initialValues={{ q: "Central", city: "Bratislava", serviceId: "srv-dental" }}
        onSubmit={vi.fn()}
        onReset={vi.fn()}
      />
    );

    expect(screen.getByLabelText("Kľúčové slovo")).toHaveValue("Central");
    expect(screen.getByLabelText("Mesto")).toHaveValue("Bratislava");
    expect(screen.getByLabelText("Služba")).toHaveValue("srv-dental");
  });

  it("calls onSubmit when form is submitted", () => {
    const handleSubmit = vi.fn();
    render(
      <SearchForm
        initialValues={defaultInitialValues}
        onSubmit={handleSubmit}
        onReset={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText("Kľúčové slovo"), {
      target: { value: "Poliklinika" },
    });
    fireEvent.change(screen.getByLabelText("Mesto"), {
      target: { value: "Košice" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Vyhľadať" }));

    expect(handleSubmit).toHaveBeenCalledWith({
      q: "Poliklinika",
      city: "Košice",
      serviceId: "",
    });
  });

  it("supports keyboard submission on query input", () => {
    const handleSubmit = vi.fn();
    render(
      <SearchForm
        initialValues={defaultInitialValues}
        onSubmit={handleSubmit}
        onReset={vi.fn()}
      />
    );

    const queryInput = screen.getByLabelText("Kľúčové slovo");
    fireEvent.change(queryInput, { target: { value: "Klinika" } });
    fireEvent.submit(screen.getByRole("form"));

    expect(handleSubmit).toHaveBeenCalledWith({
      q: "Klinika",
      city: "",
      serviceId: "",
    });
  });

  it("calls onReset when reset button is clicked", () => {
    const handleReset = vi.fn();
    render(
      <SearchForm
        initialValues={{ q: "Central", city: "Bratislava", serviceId: "" }}
        onSubmit={vi.fn()}
        onReset={handleReset}
      />
    );

    const resetButton = screen.getByRole("button", { name: "Vynulovať filtre" });
    fireEvent.click(resetButton);

    expect(handleReset).toHaveBeenCalled();
  });
});
