export const initialState = {
  // focus time length
  focusSpan: 1500000,
  // break time length
  breakSpan: 300000,
  // current mode (focus or break)
  currentMode: 'focus',
  // whether the timer is running
  isRunning: false,
  // time when timer last began
  startTime: null,
  // remaining time displayed
  remainingTime: 1500000,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_time':
      return {
        remainingTime: action.payload,
        ...state,
      }
    case 'start':
      return {
        isRunning: true,
        startTime: action.payload,
        ...state,
      }
    case 'pause':
      return {
        isRunning: false,
        startTime: null,
        ...state,
      }
    case 'resume':
      return {
        isRunning: true,
        startTime: action.payload,
        ...state,
      }
    case 'finish':
      return {
        isRunning: false,
        startTime: null,
        remainingTime: state.currentMode === 'focus' ? state.breakSpan : state.focusSpan,
        currentMode: state.currentMode === 'focus' ? 'break' : 'focus',
      }
    default:
      throw new Error();
  }
}

export default reducer;
