import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

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

  const loadSavedSettings = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem('settings');
      const parsedSettings = JSON.parse(storedSettings);
      
      if (parsedSettings) {
        setFocusSpan(parsedSettings.focusSpan);
        setBreakSpan(parsedSettings.breakSpan);
        setLongBreakSpan(parsedSettings.longBreakSpan);
        setLongBreakEvery(parsedSettings.longBreakEvery);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // load saved settings on mount
  useEffect(() => {
    loadSavedSettings();
  }, []);

  // save settings on change
  useEffect(() => {
    try {
      const toSave = {
        focusSpan, breakSpan, longBreakSpan, longBreakEvery,
      };
      AsyncStorage.setItem('settings', JSON.stringify(toSave));
    } catch (error) {
      console.error(error);
    }
  }, [focusSpan, breakSpan, longBreakSpan, longBreakEvery]);

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