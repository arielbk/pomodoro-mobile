import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screen = Dimensions.get('window');

export default function PageTitle({ handleBack, title, isNested }) {
  let icon;
  if (isNested) {
    icon = (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'}
        color="#d9d9d9"
        size={28}
      />
    );
  } else {
    icon = (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        color="#d9d9d9"
        size={28}
      />
    );
  }
  return (
    <>
      <View style={styles.buffer} />
      <SafeAreaView style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => handleBack()}
            style={{ padding: 12 }}
          >
            {icon}
          </TouchableOpacity>
          <Text style={styles.titleText}>{title}</Text>
          <View style={{ width: 28, height: 28 }} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    shadowOffset: { width: 0, height: 20 },
    shadowColor: 'rgb(49, 66, 72)',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    backgroundColor: '#fff',
    zIndex: 999,
  },
  buffer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screen.width,
    height: 60,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    width: screen.width,
  },
  titleText: {
    color: '#676767',
    fontSize: 24,
    fontWeight: '500',
  },
});
