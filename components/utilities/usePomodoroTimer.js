import { useReducer, useEffect, useRef } from 'react';

export const initialState = {
  // focus time length
  focusSpan: 1500,
  // break time length
  breakSpan: 300,
  // current mode (focus or break)
  currentMode: 'focus',
  // whether the timer is running
  isRunning: false,
  // time when timer last began
  startTime: null,
  // remaining time displayed
  remainingTime: 1500,
  // flag becomes true when timer mode finishes
  isFinished: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'start':
      return {
        ...state,
        isRunning: true,
        startTime: action.payload,
        modeCompleted: null,
        isFinished: false,
      }
    case 'pause':
      return {
        ...state,
        isRunning: false,
        startTime: null,
      }
    case 'set_remaining':
      if (action.payload > 0) return {
        ...state,
        remainingTime: action.payload,
    }
    //! if remaining time hits 0 finish fires
    case 'finish':
      return {
        ...state,
        isRunning: false,
        startTime: null,
        remainingTime: state.currentMode === 'focus'
          ? state.breakSpan
          : state.focusSpan,
        currentMode: state.currentMode === 'focus'
          ? 'break'
          : 'focus',
        isFinished: true,
      }
    case 'reset':
      return {...action.payload}
    default:
      throw new Error();
  }
}

// todo: this should take in a settings object
const usePomodoroTimer = ({ focusSpan = 1500000, breakSpan = 300000 }) => {
  const [state, dispatch] = useReducer(
    reducer,
    { ...initialState, focusSpan, breakSpan, remainingTime: focusSpan },
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
      payload: { ...initialState, focusSpan, breakSpan, remainingTime: focusSpan }
    });
  };

  return {
    ...state,
    totalTime,
    playPause,
    reset,
  }
}

export default usePomodoroTimer;
