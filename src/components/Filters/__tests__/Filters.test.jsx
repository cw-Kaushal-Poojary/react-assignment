import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "../Filters";
import { useCarContext } from "../../../Contexts/CarContext";
import '@testing-library/jest-dom';

// Mock CarContext
jest.mock("../../../Contexts/CarContext.jsx");

describe("Filters component", () => {
  let mockSetFilters;

  beforeEach(() => {
    mockSetFilters = jest.fn();
    useCarContext.mockReturnValue({
      filters: { minBudget: 0, maxBudget: 50, fuel: [] },
      setFilters: mockSetFilters,
    });
  });

  test("renders filter inputs correctly", () => {
    render(<Filters />);

    // Check if inputs are in the document
    expect(screen.getByPlaceholderText("0")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("50")).toBeInTheDocument();
    expect(screen.getByLabelText(/Petrol/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Diesel/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CNG/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/LPG/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Electric/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hybrid/i)).toBeInTheDocument();
  });

  test("handles min and max budget changes", () => {
    render(<Filters />);

    // Simulate min budget change
    const minBudgetInput = screen.getByTestId("min-budget");
    const maxBudgetInput = screen.getByTestId("max-budget");
    
    fireEvent.change(minBudgetInput, { target: { value: '5' } });
    fireEvent.blur(minBudgetInput);

    // check if value is updated
    expect(minBudgetInput).toHaveValue(5);

    fireEvent.change(maxBudgetInput, { target: { value: '100' } });
    fireEvent.blur(maxBudgetInput);

    expect(maxBudgetInput).toHaveValue(100);
  });

  test("handles fuel checkbox selection", () => {
    render(<Filters />);

    // Simulate selecting Petrol checkbox
    const petrolCheckbox = screen.getByLabelText(/Petrol/i);
    fireEvent.click(petrolCheckbox);

    expect(mockSetFilters).toHaveBeenCalledWith({
      minBudget: 0,
      maxBudget: 50,
      fuel: [1],
    });

    // Simulate selecting Diesel checkbox
    const dieselCheckbox = screen.getByText(/Diesel/i);
    fireEvent.click(dieselCheckbox);

    expect(mockSetFilters).toHaveBeenCalledWith({
      minBudget: 0,
      maxBudget: 50,
      fuel: [1, 2],
    });

    // Simulate unchecking Petrol checkbox
    fireEvent.click(petrolCheckbox);

    expect(mockSetFilters).toHaveBeenCalledWith({
      minBudget: 0,
      maxBudget: 50,
      fuel: [2],
    });
  });

  test("clear button resets filters", () => {
    render(<Filters />);

    // Simulate selecting Petrol checkbox
    const petrolCheckbox = screen.getByLabelText(/Petrol/i);
    fireEvent.click(petrolCheckbox);

    // Simulate clearing filters
    const clearButton = screen.getByText(/Clear All/i);
    fireEvent.click(clearButton);

    expect(mockSetFilters).toHaveBeenCalledWith({
      minBudget: 0,
      maxBudget: 50,
      fuel: [],
    });

    // Check if the inputs are reset
    expect(screen.getByPlaceholderText("0")).toHaveValue(0);
    expect(screen.getByPlaceholderText("50")).toHaveValue(50);

    // Check if the checkboxes are unchecked
    expect(screen.getByLabelText(/Petrol/i)).not.toBeChecked();
  });
});
