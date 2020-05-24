import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { LogsContext } from '../../utilities/LogsContext';

import usePomodoroTimer from '../../utilities/usePomodoroTimer';

import Content from './Content';
import Footer from './Footer';

export default function MainView({ navigation }) {
  const { pomodoroCount } = useContext(LogsContext);
  const timer = usePomodoroTimer();

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
