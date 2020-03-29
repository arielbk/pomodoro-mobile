export const initialState = {
  // focus time length
  focusSpan: 5000,
  // break time length
  breakSpan: 3000,
  // current mode (focus or break)
  currentMode: 'focus',
  // whether the timer is running
  isRunning: false,
  // time when timer last began
  startTime: null,
  // remaining time displayed
  remainingTime: 5000,
  // storedTime
  storedTime: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'start':
      return {
        ...state,
        isRunning: true,
        startTime: action.payload,
      }
    case 'pause':
      return {
        ...state,
        isRunning: false,
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
      }
    case 'reset':
      return {...initialState}
    default:
      throw new Error();
  }
}

export default reducer;
