import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screen = Dimensions.get('window');

const Settings = ({navigation}) => (
  <SafeAreaView style={styles.mainContent}>
  <View style={styles.topIcons}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'} color="#d9d9d9" size={32} />
    </TouchableOpacity>
    <Text style={styles.title}>
      Settings
    </Text>
  </View>
</SafeAreaView>
);

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  topIcons: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: screen.width - 80,
    marginTop: 20,
  },
  title: {
    color: '#676767',
    fontSize: 28,
    fontWeight: '300',
    marginLeft: 36,
  }
});


export default Settings;
