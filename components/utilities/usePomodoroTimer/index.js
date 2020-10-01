import { useReducer, useEffect, useRef, useContext } from 'react';
import { Audio } from 'expo-av';
import reducer, { initialState } from './reducer';
import { SettingsContext } from '../SettingsContext';
import { NotificationContext } from '../NotificationContext';
import { LogsContext } from '../LogsContext';
import { ProjectsContext } from '../ProjectsContext';

const endSound = new Audio.Sound();
endSound.loadAsync(require('../../../assets/sounds/levelup.mp3'));

const usePomodoroTimer = () => {
  const { focusSpan, breakSpan, longBreakSpan, longBreakEvery } = useContext(
    SettingsContext
  );
  const { sendScheduledNotification, cancelNotifications } = useContext(
    NotificationContext
  );
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    focusSpan,
    breakSpan,
    longBreakSpan,
    remainingTime: focusSpan,
  });
  const interval = useRef();
  const { addPomodoroLog, pomodoroCount } = useContext(LogsContext);
  const { selectedProject } = useContext(ProjectsContext);

  const totalTime =
    state.currentMode === 'focus' ? state.focusSpan : state.breakSpan;

  const playPause = () => {
    const now = new Date().getTime();
    dispatch({
      type: state.isRunning ? 'pause' : 'start',
      payload: now,
    });
  };

  const reset = () => {
    dispatch({
      type: 'reset',
      payload: {
        ...initialState,
        focusSpan,
        breakSpan,
        remainingTime: focusSpan,
      },
    });
  };

  const setLongBreak = () => dispatch({ type: 'set_long_break' });

  useEffect(() => {
    if (state.isRunning) {
      // set state every interval
      interval.current = setInterval(() => {
        const timeElapsed = new Date().getTime() - state.startTime;
        dispatch({
          type: 'set_remaining',
          payload: state.remainingTime - timeElapsed,
        });
      }, 30);
      // send notification on state end
      const determineNotification = (currentState) => {
        switch (currentState) {
          case 'focus':
            return { title: 'Focus timer ended', body: 'Time to take a break' };
          case 'break':
            return { title: 'Break timer ended', body: 'Time fto focus' };
          case 'longBreak':
            return { title: 'Long break timer ended', body: 'Time to focus' };
          default:
            return { title: 'Timer ended', body: 'Time to focus' };
        }
      };
      sendScheduledNotification(
        determineNotification(state.currentMode),
        state.remainingTime
      );
    } else {
      clearInterval(interval.current);
      cancelNotifications();
    }
  }, [state.isRunning]);

  useEffect(() => {
    dispatch({
      type: 'change_settings',
      payload: {
        focusSpan,
        breakSpan,
        longBreakSpan,
      },
    });
  }, [focusSpan, breakSpan, longBreakSpan]);

  useEffect(() => {
    if (state.isFinished) {
      // if focus period has just finished
      if (state.currentMode === 'break' || state.currentMode === 'longBreak') {
        addPomodoroLog({
          timeCompleted: Date.now(),
          project: selectedProject,
          length: focusSpan,
        });
      }
      // play finishing sound
      try {
        endSound.replayAsync();
      } catch (error) {
        console.error(error);
      }
    }
  }, [state.isFinished]);

  useEffect(() => {
    if (pomodoroCount !== 0 && pomodoroCount % longBreakEvery === 0) {
      setLongBreak();
    }
  }, [pomodoroCount]);

  return {
    ...state,
    totalTime,
    playPause,
    reset,
    setLongBreak,
  };
};

export default usePomodoroTimer;
