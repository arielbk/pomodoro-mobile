import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Audio } from 'expo-av';

import usePomodoroCount from '../../utilities/usePomodoroCount';
import usePomodoroTimer from '../../utilities/usePomodoroTimer';

import Content from './Content';
import Footer from './Footer';

const endSound = new Audio.Sound();
endSound.loadAsync(require('../../../assets/sounds/levelup.mp3'));

export default function MainView() {
  const [pomodoroCount, incrementPomodoro] = usePomodoroCount();
  const timer = usePomodoroTimer({});
  
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
      <Content timer={timer} />
      <Footer pomodoroCount={pomodoroCount} timer={timer} />
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
});
