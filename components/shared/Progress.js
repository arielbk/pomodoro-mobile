import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Animated, Easing } from 'react-native';
const screen = Dimensions.get('window');

export default function Progress({ isRunning, remainingTime, totalTime }) {
  const [widthAnim] = useState(new Animated.Value(0)); // initial width of 0

  useEffect(() => {
    if (isRunning) {
      Animated.timing(
        widthAnim,
        {
          toValue: 1,
          easing: Easing.linear,
          duration: remainingTime,
        }
        ).start();
      } else if (remainingTime === totalTime) {
        Animated.timing(
          widthAnim,
          {
            toValue: 0,
            easing: Easing.linear,
            duration: 500,
          }
          ).start();
      } else {
        Animated.timing(
          widthAnim,
          {
            toValue: (totalTime - remainingTime) / totalTime || 0,
            easing: Easing.linear,
            duration: 500,
          }
      ).start();
    }
    if (!isRunning && totalTime === remainingTime) {
      Animated.timing(
        widthAnim,
        {
          toValue: 0,
          easing: Easing.linear,
          duration: 500,
        }
      ).start();
    }
  }, [isRunning, remainingTime]);

  return (
    <View style={styles.container}>
      <View style={styles.outerBar}>
        <Animated.View
          style={{
            ...styles.innerBar,
            width: widthAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            })
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerBar: {
    borderRadius: 16,
    backgroundColor: '#d9d9d9',
    height: 16,
    width: screen.width - 80,
  },
  innerBar: {
    height: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'rgb(49, 66, 72)',
    shadowOpacity: 0.25,
    shadowRadius: 10,
  }
});
