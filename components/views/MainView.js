import React, { useReducer } from 'react';
import { StyleSheet, View } from 'react-native';

export default function MainView() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [millis, setMillis] = useState(0);

  const handleStart = () => dispatch({ type: 'start', payload: new Date().getTime() });
  const handlePause = () => dispatch({ type: 'pause', payload: new Date().getTime() });
  const handleResume = () => dispatch({ type: 'resume', payload: new Date().getTime() });
  const handleReset = () => {
    setMillis(0);
    dispatch({ type: 'reset' })
  };

  useEffect(() => {
    if (state.isActive) {
      interval.current = setInterval(() => {
        setMillis(state.millisSaved + new Date().getTime() - state.lastStarted)
      }, 10);
    } else {
      clearInterval(interval.current);
    }
  }, [state.isActive]);

  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
