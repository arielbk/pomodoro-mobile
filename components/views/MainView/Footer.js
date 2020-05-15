import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SettingsContext } from '../../utilities/SettingsContext';

const screen = Dimensions.get('window');

const Footer = ({ timer, pomodoroCount }) => {
  const { dailyGoal } = useContext(SettingsContext);
  return (
    <View style={styles.footerContent}>
      <TouchableOpacity onPress={timer.reset}>
        <View style={styles.button}>
          <Text>
            {Platform.OS === 'android' ? (
              <Ionicons name="md-refresh" color="#676767" size={36} />
            ) : (
              <Ionicons name="ios-refresh" color="#676767" size={36} />
            )}
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.pomodoroCount}>
        {pomodoroCount} / {dailyGoal}
      </Text>
      <TouchableOpacity onPress={timer.playPause}>
        <View style={styles.button}>
          <Text>
            {timer.isRunning ? (
              Platform.OS === 'android' ? (
                <Ionicons name="md-pause" color="#676767" size={36} />
              ) : (
                <Ionicons name="ios-pause" color="#676767" size={36} />
              )
            ) : Platform.OS === 'android' ? (
              <Ionicons name="md-play" color="#676767" size={36} />
            ) : (
              <Ionicons name="ios-play" color="#676767" size={36} />
            )}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContent: {
    width: screen.width - 80,
    height: 130,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  },
});

export default Footer;
