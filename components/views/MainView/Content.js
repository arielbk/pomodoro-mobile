import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Timer from '../../shared/Timer';
import Progress from '../../shared/Progress';

const screen = Dimensions.get('window');

const Content = ({timer}) => (
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
);

const styles = StyleSheet.create({
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
});


export default Content;
