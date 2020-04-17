export const initialState = {
  // current mode (focus or break)
  currentMode: 'focus',
  // whether the timer is running
  isRunning: false,
  // time when timer last began
  startTime: null,
  // flag becomes true when timer mode finishes
  isFinished: false,
};

export default (state, action) => {
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
      if (currentSpan === state.remainingTime) {
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
