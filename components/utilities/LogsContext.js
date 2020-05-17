import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { isToday, subDays } from 'date-fns';

const testingInitialData = [
  {
    length: 1500000,
    project: 'Voting',
    timeCompleted: subDays(Date.now(), 1),
  },
  {
    length: 1500000,
    project: 'Pomodoro',
    timeCompleted: subDays(Date.now(), 1) - 1000,
  },
  {
    length: 1500000,
    project: 'Voting',
    timeCompleted: subDays(Date.now(), 1) - 2000,
  },
  {
    length: 1500000,
    project: 'Voting',
    timeCompleted: subDays(Date.now(), 1) - 3000,
  },
  {
    length: 1500000,
    project: 'Voting',
    timeCompleted: subDays(Date.now(), 2),
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: subDays(Date.now(), 2) - 10000,
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: subDays(Date.now(), 3),
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: subDays(Date.now(), 5),
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: subDays(Date.now(), 5) - 10000,
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: subDays(Date.now(), 5) - 20000,
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: subDays(Date.now(), 5) - 30000,
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: subDays(Date.now(), 6),
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: subDays(Date.now(), 7),
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: subDays(Date.now(), 7) - 10000,
  },
  {
    length: 1500000,
    project: 'Maths',
    timeCompleted: subDays(Date.now(), 8),
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
    setPomodoroCount(
      logs.filter((log) => isToday(new Date(log.timeCompleted))).length
    );
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
