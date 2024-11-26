import React, { createContext, useState, useContext, useMemo } from 'react';

export const DataContext = createContext(null);

export const useDataContext = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const ProvidedValue = useMemo(
    () => ({
      search,
      setSearch,
    }),
    [search, setSearch]
  );

  return <DataContext.Provider value={ProvidedValue}>{children}</DataContext.Provider>;
};

export default DataProvider;
