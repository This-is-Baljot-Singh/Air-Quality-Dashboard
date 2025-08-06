import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

export const FilterProvider = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState(12); // December
  const [selectedYear, setSelectedYear] = useState(2024);

  const clearFilters = () => {
    setSelectedMonth('all');
    setSelectedYear('all');
  };

  const value = {
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    clearFilters
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};
