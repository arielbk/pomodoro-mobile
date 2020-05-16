import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  // number of days to show
  const [days, setDays] = useState(7);
  // project
  const [project, setProject] = useState(null);

  return (
    <FilterContext.Provider
      value={{
        days,
        setDays,
        project,
        setProject,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
