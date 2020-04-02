import React, { createContext, useState } from 'react'

const defaultValues = {
  // focus time length
  focusSpan: 1500000,
  // break time length
  breakSpan: 300000,
  // long break time length
  longBreakSpan: 900000,

  // does a context require object fields to already exist?
  setFocusSpan: () => null,
  setBreakSpan: () => null,
}

export const SettingsContext = createContext(defaultValues);

export const SettingsProvider = ({ children }) => {
  const [focusSpan, setFocusSpan] = useState(defaultValues.focusSpan);
  const [breakSpan, setBreakSpan] = useState(defaultValues.breakSpan);
  const [longBreakSpan, setLongBreakSpan] = useState(defaultValues.longBreakSpan);

  return (
    <SettingsContext.Provider value={{
      ...defaultValues,
      focusSpan,
      breakSpan,
      longBreakSpan,
      setFocusSpan,
      setBreakSpan,
      setLongBreakSpan,
    }}>
      {children}
    </SettingsContext.Provider>
  )
}