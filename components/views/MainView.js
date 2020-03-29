import React, { useReducer, useRef, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { Audio } from 'expo-av';

import reducer, { initialState } from '../reducers/countdown';
import Timer from '../shared/Timer';
import Progress from '../shared/Progress';

const screen = Dimensions.get('window');
const endSound = new Audio.Sound();
endSound.loadAsync(require('../../assets/sounds/levelup.mp3'));

export default function MainView() {
  const [state, dispatch] = useReducer(reducer, initialState)
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
  }, [state.isRunning])

  useEffect(() => {
    if (state.isFinished) {
      try {
        endSound.playAsync();
      } catch (error) {
        console.error(error);
      }
    }
  }, [state.isFinished]);

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
            onPress={() => {
              const now = new Date().getTime();
              dispatch({
                type: state.isRunning ? 'pause' : 'start',
                payload: now,
              });
            }
          }>
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
    height: 180,
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
    borderRadius: 75,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 65,
    elevation: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'rgb(49, 66, 72)',
    shadowOpacity: 0.25,
    shadowRadius: 10,
  }
});
