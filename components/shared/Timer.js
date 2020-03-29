import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const formatTime = millis => {
  const mins = Math.floor(millis / 1000 / 60);
  const secs = Math.floor(millis / 1000 - mins * 60);
  const centis = Math.floor((millis - mins * 60 * 1000 - secs * 1000) / 10);
  return {
    minutes: String(mins).padStart(2, '0'),
    seconds: String(secs).padStart(2, '0'),
    centiseconds: String(centis).padStart(2, '0')
  }
}

export default function Timer({ millis }) {
  const { minutes, seconds, centiseconds } = formatTime(millis);
  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {`${minutes}:${seconds}.${centiseconds}`}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 92,
    color: '#676767',
    fontVariant: ['tabular-nums'],
  }
});
