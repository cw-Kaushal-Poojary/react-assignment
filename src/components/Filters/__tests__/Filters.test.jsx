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
    expect(screen.getByPlaceholderText(/0/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/21/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Petrol/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Diesel/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CNG/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/LPG/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Electric/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hybrid/i)).toBeInTheDocument();
  });

  // test("handles min and max budget changes", () => {
  //   render(<Filters />);

  //   // Simulate min budget change
  //   const minBudgetInput = screen.getByPlaceholderText(/0/i);
  //   // Enter 5 in the input, and trigger the change event. When the blur event is triggered, the useEffect hook will update the context
  //   fireEvent.change(minBudgetInput, { target: { value: '5' } });
  //   fireEvent.blur(minBudgetInput);

  //   expect(mockSetFilters).toHaveBeenCalledWith({
  //     minBudget: '5',
  //     maxBudget: 50,
  //     fuel: [],
  //   });
  // });

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
    expect(screen.getByPlaceholderText(/0/i)).toHaveValue(0);
    expect(screen.getByPlaceholderText(/21/i)).toHaveValue(50);

    // Check if the checkboxes are unchecked
    expect(screen.getByLabelText(/Petrol/i)).not.toBeChecked();
  });
});
