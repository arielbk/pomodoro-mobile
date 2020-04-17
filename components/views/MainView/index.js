import React, { useEffect, useContext } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Audio } from 'expo-av';
import {SettingsContext} from '../../utilities/SettingsContext'

import usePomodoroCount from '../../utilities/usePomodoroCount';
import usePomodoroTimer from '../../utilities/usePomodoroTimer';

import Content from './Content';
import Footer from './Footer';

const endSound = new Audio.Sound();
endSound.loadAsync(require('../../../assets/sounds/levelup.mp3'));

export default function MainView({navigation}) {
  const [pomodoroCount, incrementPomodoro] = usePomodoroCount();
  const settings = useContext(SettingsContext);
  const timer = usePomodoroTimer(settings);

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

  useEffect(() => {
    if (pomodoroCount !== 0 && pomodoroCount % settings.longBreakEvery === 0) {
      timer.setLongBreak();
    }
  }, [pomodoroCount]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Content timer={timer} navigation={navigation} />
        <Footer pomodoroCount={pomodoroCount} timer={timer} />
      </SafeAreaView>
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
