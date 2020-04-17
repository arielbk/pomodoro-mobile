import { useReducer, useEffect, useRef, useContext } from 'react';
import reducer, { initialState } from './reducer';
import { SettingsContext } from '../SettingsContext';

const usePomodoroTimer = () => {
  const settings = useContext(SettingsContext);
  const [state, dispatch] = useReducer(
    reducer,
    {
      ...initialState,
      focusSpan: settings.focusSpan,
      breakSpan: settings.breakSpan,
      longBreakSpan: settings.longBreakSpan,
      remainingTime: settings.focusSpan
    },
  );
  const interval = useRef();

  useEffect(() => {
    if (state.isRunning) {
      interval.current = setInterval(() => {
        const timeElapsed = new Date().getTime() - state.startTime;
        dispatch({
          type: 'set_remaining',
          payload: state.remainingTime - timeElapsed,
        });
      }, 30)
    } else {
      clearInterval(interval.current);
    }
  }, [state.isRunning]);

  useEffect(() => {
    dispatch({
      type: 'change_settings',
      payload: settings,
    });
  }, [settings]);

  const totalTime = state.currentMode === 'focus'
    ? state.focusSpan
    : state.breakSpan;

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
        remainingTime: focusSpan
      }
    });
  };

  const setLongBreak = () => dispatch({type: 'set_long_break'});

  return {
    ...state,
    totalTime,
    playPause,
    reset,
    setLongBreak,
  }
}

export default usePomodoroTimer;
