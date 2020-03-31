import { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

const dateNow = () => {
  const now = new Date();
  return `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`;
}

const usePomodoroCount = () => {
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const incrementPomodoro = () => setPomodoroCount(prev => prev + 1);

  // load stored pomodoro count
  const loadStoredCount = async () => {
    try {
      const storedCount = await AsyncStorage.getItem('pomodoroCount');
      const parsedCount = JSON.parse(storedCount);
      if (parsedCount) setPomodoroCount(parsedCount.count);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadStoredCount();
  }, []);

  useEffect(() => {
    try {
      const toSave = {
        count: pomodoroCount,
        date: dateNow(),
      }
      AsyncStorage.setItem('pomodoroCount', JSON.stringify(toSave));
    } catch (error) {
      console.error(error);
    }
  }, [pomodoroCount]);

  return [pomodoroCount, incrementPomodoro];
}

export default usePomodoroCount;
