import { useReducer, useEffect, useRef, useContext } from 'react';
import reducer, { initialState } from './reducer';
import { SettingsContext } from '../SettingsContext';
import { NotificationContext } from '../NotificationContext';

const usePomodoroTimer = () => {
  const { focusSpan, breakSpan, longBreakSpan } = useContext(SettingsContext);
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

  useEffect(() => {
    if (state.isRunning) {
      // set timer every interval
      interval.current = setInterval(() => {
        const timeElapsed = new Date().getTime() - state.startTime;
        dispatch({
          type: 'set_remaining',
          payload: state.remainingTime - timeElapsed,
        });
      }, 30);
      // send notification on timer end
      const title = 'Timer ended';
      let body;
      if (state.currentMode === 'break' || state.currentMode === 'longBreak')
        body = 'Time to focus!';
      if (state.currentMode === 'focus') body = 'Time for a break!';
      sendScheduledNotification(
        { title, body },
        Date.now() + state.remainingTime
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

  return {
    ...state,
    totalTime,
    playPause,
    reset,
    setLongBreak,
  };
};

export default usePomodoroTimer;
