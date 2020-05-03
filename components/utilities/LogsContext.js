import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { isToday, subDays } from 'date-fns';

const testingInitialData = [
  {
    length: 1500000,
    project: 'Voting',
    timeCompleted: subDays(Date.now() - 1, 1),
  },
  {
    length: 1500000,
    project: 'Pomodoro',
    timeCompleted: 1587287305102,
  },
  {
    length: 1500000,
    project: 'Voting',
    timeCompleted: 1587207305103,
  },
  {
    length: 1500000,
    project: 'Voting',
    timeCompleted: 1587207305104,
  },
  {
    length: 1500000,
    project: 'Voting',
    timeCompleted: 1587207305105,
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: 1586207305106,
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: 1586207305107,
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: 1586207305108,
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: 1586207305109,
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: 1576207305107,
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: 1576207305107,
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: 1576207305106,
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: 1576207305105,
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: 1576207305104,
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: 1576207305103,
  },
];

export const LogsContext = createContext();

export const LogsProvider = ({ children }) => {
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [logs, setLogs] = useState([]);

  // load stored logs
  const loadStoredLogs = async () => {
    try {
      const storedLogs = await AsyncStorage.getItem('pomodoroLogs');
      const parsedLogs = JSON.parse(storedLogs);
      setLogs(parsedLogs);
      // ! just here for testing
      setLogs(testingInitialData);
    } catch (error) {
      console.error(error);
    }
  };

  // load stored logs on initial mount
  useEffect(() => {
    loadStoredLogs();
  }, []);

  // if logs change
  useEffect(() => {
    // calculate the new pomodoro count
    setPomodoroCount(logs.filter((log) => isToday(log.timeCompleted)).length);
    // save the logs to async storage
    AsyncStorage.setItem('pomodoroLogs', JSON.stringify(logs));
  }, [logs.length]);

  const addPomodoroLog = (log) => setLogs((prev) => [...prev, log]);

  return (
    <LogsContext.Provider
      value={{
        pomodoroCount,
        pomodoroLog: logs,
        addPomodoroLog,
      }}
    >
      {children}
    </LogsContext.Provider>
  );
};
