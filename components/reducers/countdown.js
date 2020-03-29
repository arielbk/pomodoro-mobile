export const initialState = {
  // focus time length
  focusSpan: 10000,
  // break time length
  breakSpan: 5000,
  // current mode (focus or break)
  currentMode: 'focus',
  // whether the timer is running
  isRunning: false,
  // time when timer last began
  startTime: null,
  // remaining time displayed
  remainingTime: 10000,
  // 
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
      return {...initialState}
    default:
      throw new Error();
  }
}

export default reducer;
