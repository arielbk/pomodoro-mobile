import React, { createContext, useState } from 'react'

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  // focus time length
  const [focusSpan, setFocusSpan] = useState(1500000);
  // break time length
  const [breakSpan, setBreakSpan] = useState(300000);
  // long break time length
  const [longBreakSpan, setLongBreakSpan] = useState(900000);
  // long break after every _n_ pomodoros
  const [longBreakEvery, setLongBreakEvery] = useState(4);

  return (
    <SettingsContext.Provider value={{
      focusSpan,
      setFocusSpan,
      breakSpan,
      setBreakSpan,
      longBreakSpan,
      setLongBreakSpan,
      longBreakEvery,
      setLongBreakEvery,
    }}>
      {children}
    </SettingsContext.Provider>
  )
}