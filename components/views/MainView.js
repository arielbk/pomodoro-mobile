import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Dimensions, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

import Timer from '../shared/Timer';
import Progress from '../shared/Progress';
import usePomodoroCount from '../utilities/usePomodoroCount';
import usePomodoroTimer from '../utilities/usePomodoroTimer';

const screen = Dimensions.get('window');
const endSound = new Audio.Sound();
endSound.loadAsync(require('../../assets/sounds/levelup.mp3'));

export default function MainView() {
  const [pomodoroCount, incrementPomodoro] = usePomodoroCount();
  const timer = usePomodoroTimer();
  
  useEffect(() => {
    if (timer.isFinished) {
      // if focus period has just finished
      if (timer.currentMode === 'break') incrementPomodoro();
      // play finishing sound
      try {
        endSound.replayAsync();
      } catch (error) {
        console.error(error);
      }
    }
  }, [timer.isFinished]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>

        <View style={styles.mainContent}>
          <View style={styles.topIcons}>
            <TouchableOpacity onPress={() => console.log('open menu')}>
              <Ionicons name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} color="#d9d9d9" size={40} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('open settings')}>
              <Ionicons name={Platform.OS === 'android' ? 'md-settings' : 'ios-settings'} color="#d9d9d9" size={40} />
            </TouchableOpacity>
          </View>
          <Text style={styles.projectText}>Project name</Text>
          <Timer millis={timer.remainingTime} />
          <Progress totalTime={timer.totalTime} remainingTime={timer.remainingTime} isRunning={timer.isRunning} />
          <Text style={styles.currentMode}>{timer.currentMode}</Text>
        </View>

        <View style={styles.footerContent}>
          
          <TouchableOpacity onPress={timer.reset}>
            <View style={styles.button}>
              <Text>
                {
                  Platform.OS === 'android'
                    ? <Ionicons name="md-refresh" color="#676767" size={36} />
                    : <Ionicons name="ios-refresh" color="#676767" size={36} />
                }
              </Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.pomodoroCount}>
            {pomodoroCount} / 8
          </Text>

          <TouchableOpacity onPress={timer.playPause}>
            <View style={styles.button}>
              <Text>
                {
                  timer.isRunning
                    ? Platform.OS === 'android'
                      ? <Ionicons name="md-pause" color="#676767" size={36} />
                      : <Ionicons name="ios-pause" color="#676767" size={36} />
                    : Platform.OS === 'android'
                      ? <Ionicons name="md-play" color="#676767" size={36} />
                      : <Ionicons name="ios-play" color="#676767" size={36} />
                }
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
    marginTop: 80,
  },
  topIcons: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screen.width - 80,
  },
  footerContent: {
    width: screen.width - 80,
    height: 130,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    shadowColor: '#6F86B4',
    shadowOpacity: 0.125,
    shadowRadius: 10,
  },
  pomodoroCount: {
    color: '#adadad',
    fontSize: 28,
    fontWeight: '200',
    marginVertical: 20,
  }
});
