import { createContext, useState, useContext } from 'react';

// Create the context
const CarContext = createContext();

// Create the provider component
export const CarContextProvider = ({ children }) => {
  // Initialize state for filters and sorting
  const [filters, setFilters] = useState({ minBudget: 0, maxBudget: 50, fuel: [] });
  const [sortOption, setSortOption] = useState('');
  const [cars, setCars] = useState([]);

  return (
    <CarContext.Provider value={{ filters, setFilters, sortOption, setSortOption, cars, setCars }}>
      {children}
    </CarContext.Provider>
  );
};

// Custom hook to use the context
export const useCarContext = () => {
  return useContext(CarContext);
};
