// MODULES //
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// COMPONENTS //
import Cars from "../Cars";

// CONTEXT //
import { useCarContext } from "../../../Contexts/CarContext";

// CONSTANTS //
import {
  dummyCars,
  dummyCarsAscending,
  dummyCarsDescending,
} from "../../../Constants";

// Mock CarContext
jest.mock("../../../Contexts/CarContext");

describe("Cars Component", () => {
  // Test Sorting
  let mockSetCars;

  beforeEach(() => {
    mockSetCars = jest.fn();
    fetchMock.mockResponseOnce(JSON.stringify({ stocks: dummyCars }));
    useCarContext.mockReturnValue({
      filters: { minBudget: 0, maxBudget: 50, fuel: [] },
      setFilters: jest.fn(),
      sortOption: "",
      setSortOption: jest.fn(),
      cars: dummyCars,
      setCars: mockSetCars,
    });
  });

  test("renders cars correctly", async () => {
    render(<Cars />);

    // Check if CarCard is rendered
    expect(await screen.getByText("Test Car")).toBeInTheDocument();
    expect(await screen.getByText("Test Car 2")).toBeInTheDocument();
  });

  test("sorts cars in ascending order", () => {
    render(<Cars />);

    const sortSelect = screen.getByTestId("sort-cars");
    fireEvent.change(sortSelect, { target: { value: "priceasc" } });

    expect(mockSetCars).toHaveBeenCalledWith(dummyCarsAscending);
  });

  test("sorts cars in descending order", () => {
    render(<Cars />);

    const sortSelect = screen.getByTestId("sort-cars");
    fireEvent.change(sortSelect, { target: { value: "pricedesc" } });

    expect(mockSetCars).toHaveBeenCalledWith(dummyCarsDescending);
  });
});
