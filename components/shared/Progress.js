import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
const screen = Dimensions.get('window');

export default function Progress({ percentage }) {
  const percentStyling = {
    width: `${percentage}%`,
  };

  return (
    <View style={styles.container}>
      <View style={styles.outerBar}>
        <View style={[styles.innerBar, percentStyling]} />
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
    backgroundColor: '#676767',
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
