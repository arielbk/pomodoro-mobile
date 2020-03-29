import React, { useReducer, useRef, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, StatusBar, Dimensions } from 'react-native';

import reducer, { initialState } from '../reducers/countdown';
import Timer from '../shared/Timer';
import Progress from '../shared/Progress';

const screen = Dimensions.get('window');

export default function MainView() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const interval = useRef();

  useEffect(() => {
    if (state.isRunning) {
      interval.current = setInterval(() =>
        dispatch({
          type: 'set_remaining',
          payload: state.remainingTime - (new Date().getTime() - state.startTime),
        }), 30);
    } else {
      clearInterval(interval.current);
    }
  }, [state.isRunning])

  const mainAction = state.isRunning
    ? ({ type: 'pause', payload: new Date().getTime()})
    : ({ type: 'start', payload: new Date().getTime()})

  const totalTime = state.currentMode === 'focus'
    ? state.focusSpan
    : state.breakSpan;
  const percentage = Math.floor((totalTime - state.remainingTime) / totalTime * 100)
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>

        <View style={styles.mainContent}>
          <Text style={styles.projectText}>Project name</Text>
          <Timer millis={state.remainingTime} />
          <Progress percentage={percentage} />
          <Text style={styles.currentMode}>{state.currentMode}</Text>
        </View>

        <View style={styles.footerContent}>
          
          <TouchableOpacity
            onPress={() => dispatch({type: 'reset'})}
          >
            <View style={styles.button}>
              <Text>reset</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => dispatch(mainAction)}
          >
            <View style={styles.button}>
              <Text>
                {mainAction.type}
              </Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  footerContent: {
    width: screen.width - 80,
    height: 140,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#eee',
  },
  projectText: {
    fontSize: 28,
    color: '#ADADAD',
    fontWeight: '300',
    marginTop: 60,
    marginBottom: 20,
  },
  currentMode: {
    marginTop: 10,
    color: '#adadad',
    textTransform: 'uppercase',
    fontSize: 18,
  },
  buttonContainer: {
    borderRadius: 65,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 65,
    backgroundColor: '#fff',
    borderRadius: 65,
    elevation: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'rgb(49, 66, 72)',
    shadowOpacity: 0.25,
    shadowRadius: 10,
  }
});
