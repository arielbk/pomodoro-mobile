import React, {useContext} from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Text, TouchableOpacity, Dimensions, Platform, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SettingsProvider, SettingsContext } from '../../utilities/settingsContext';

const screen = Dimensions.get('window');

const Settings = ({navigation}) => {
  const settings = useContext(SettingsContext);
  const {
    focusSpan,
    breakSpan,
    longBreakSpan,
    setFocusSpan,
    setBreakSpan,
    setLongBreakSpan
  } = settings;
  return (
    <SettingsProvider>
      <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'} color="#d9d9d9" size={28} />
          </TouchableOpacity>
          <Text style={styles.title}>
            Settings
          </Text>
        </View>
      </SafeAreaView>
      <ScrollView style={styles.mainContent}>
        <Text style={styles.settingsItem}>
          Focus span:
          <Picker
            selectedValue={String(focusSpan/1000/60)}
            style={{
              height: 160,
              width: screen.width-160,
              marginBottom: 40,
            }}
            onValueChange={val => console.log(val)}
            onValueChange={val => setFocusSpan(Number(val * 1000 * 60))}
          >
            <Picker.Item label="5" value="5" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="15" value="15" />
            <Picker.Item label="20" value="20" />
            <Picker.Item label="25" value="25" />
            <Picker.Item label="30" value="30" />
            <Picker.Item label="35" value="35" />
          </Picker>
        </Text>
        <Text style={styles.settingsItem}>
          Break span:
          <Picker
            selectedValue={String(breakSpan/1000/60)}
            style={{
              height: 200,
              width: screen.width-160,
              marginBottom: 40,
            }}
            onValueChange={val => setBreakSpan(Number(val * 1000 * 60))}
          >
            <Picker.Item label="5" value="5" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="15" value="15" />
            <Picker.Item label="20" value="20" />
            <Picker.Item label="25" value="25" />
            <Picker.Item label="30" value="30" />
            <Picker.Item label="35" value="35" />
          </Picker>
        </Text>
        <Text style={styles.settingsItem}>
          Long break span:
          <Picker
            selectedValue={String(longBreakSpan/1000/60)}
            style={{
              height: 200,
              width: screen.width-160,
              marginBottom: 40,
            }}
            onValueChange={val => setBreakSpan(Number(val * 1000 * 60))}
          >
            <Picker.Item label="5" value="5" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="15" value="15" />
            <Picker.Item label="20" value="20" />
            <Picker.Item label="25" value="25" />
            <Picker.Item label="30" value="30" />
            <Picker.Item label="35" value="35" />
          </Picker>
        </Text>
      </ScrollView>
    </View>
  </SettingsProvider>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  topIcons: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 30,
    width: screen.width,
    marginTop: 20,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: { width: 0, height: 20 },
    shadowColor: 'rgb(49, 66, 72)',
    shadowOpacity: 0.03,
    shadowRadius: 10,
  },
  title: {
    color: '#676767',
    fontSize: 32,
    fontWeight: '300',
    marginLeft: screen.width / 4,
  },
  mainContent: {
    paddingHorizontal: 40,
    paddingTop: 60,
    width: screen.width,
  },
  settingsItem: {
    flexDirection: 'column',
    marginBottom: 26,
    fontSize: 29,
    color: '#676767',
    fontWeight: '200',
  }
});


export default Settings;
