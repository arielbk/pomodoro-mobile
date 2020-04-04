import { useReducer, useEffect, useRef } from 'react';

export const initialState = {
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
    case 'change_settings':
      // define the current total timer length
      let currentSpan;
      if (state.currentMode === 'break') currentSpan = state.breakSpan;
      if (state.currentMode === 'longBreak') currentSpan = state.longBreakSpan;
      if (state.currentMode === 'focus') currentSpan = state.focusSpan;
      // if the timer is new (no time has elapsed)
      if (currentSpan === remainingTime) {
        let newSpan;
        if (state.currentMode === 'break') newSpan = action.payload.breakSpan;
        if (state.currentMode === 'longBreak') newspan = action.payload.longBreakSpan;
        if (state.currentMode === 'focus') newSpan = action.payload.focusSpan;
        // change the current timer length
        return {
          ...state,
          focusSpan: action.payload.focusSpan,
          breakSpan: action.payload.breakSpan,
          longBreakSpan: action.payload.longBreakSpan,
          remainingTime: newSpan,
        }
      }
      // otherwise just change the settings (applied after completiong or reset)
      return {
        ...state,
        focusSpan: action.payload.focusSpan,
        breakSpan: action.payload.breakSpan,
        longBreakSpan: action.payload.longBreakSpan,
      }
    case 'set_long_break':
      return {
        ...state,
        currentMode: 'longBreak',
      }
    default:
      throw new Error();
  }
}

// todo: this should take in a settings object
const usePomodoroTimer = ({ focusSpan, breakSpan, longBreakSpan }) => {
  const [state, dispatch] = useReducer(
    reducer,
    { ...initialState, focusSpan, breakSpan, longBreakSpan, remainingTime: focusSpan },
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
      payload: {
        ...initialState,
        focusSpan,
        breakSpan,
        remainingTime: focusSpan
      }
    });
  };

  const changeSettings = settings => {
    dispatch({
      type: 'change_settings',
      payload: settings,
    });
  }

  const setLongBreak = () => dispatch({type: 'set_long_break'});

  return {
    ...state,
    totalTime,
    playPause,
    reset,
    changeSettings,
    setLongBreak,
  }
}

export default usePomodoroTimer;
