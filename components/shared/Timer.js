import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const formatTime = (millis) => {
  const mins = Math.floor(millis / 1000 / 60);
  const secs = Math.floor(millis / 1000 - mins * 60);
  const centis = Math.floor((millis - mins * 60 * 1000 - secs * 1000) / 100);
  return {
    minutes: String(mins).padStart(2, '0'),
    seconds: String(secs).padStart(2, '0'),
    centiseconds: String(centis),
  };
};

export default function Timer({ millis }) {
  const { minutes, seconds, centiseconds } = formatTime(millis);
  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
      <Text style={[styles.centisecondText]}>{`.${centiseconds}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  timerText: {
    fontSize: 72,
    color: '#676767',
    fontVariant: ['tabular-nums'],
  },
  centisecondText: {
    // position: 'absolute',
    fontSize: 72,
    color: '#d7d7d7',
    // marginLeft: 5,
    fontVariant: ['tabular-nums'],
    // right: -105,
  },
});
