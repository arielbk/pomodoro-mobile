import React, {useContext} from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Text, TouchableOpacity, Dimensions, Platform, Slider, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PageTitle from '../../shared/PageTitle';
import { SettingsProvider, SettingsContext } from '../../utilities/SettingsContext';

const screen = Dimensions.get('window');

const Settings = ({navigation}) => {
  const settings = useContext(SettingsContext);
  const {
    focusSpan,
    breakSpan,
    longBreakSpan,
    setFocusSpan,
    setBreakSpan,
    setLongBreakSpan,
    longBreakEvery,
    setLongBreakEvery,
  } = settings;
  return (
    <SettingsProvider>
      <View style={styles.container}>

      <PageTitle title="Settings" handleBack={navigation.openDrawer} />
      
      <ScrollView style={styles.mainContent}>

        <View style={styles.settingsItem}>
          <Text style={styles.settingsText}>
            Focus span: {focusSpan / 1000 / 60} minutes
          </Text>
          <Slider
            minimumTrackTintColor="#aaa"
            value={focusSpan/1000/60}
            style={{ height: 80 }}
            step={1}
            minimumValue={0}
            maximumValue={60}
            onValueChange={val => setFocusSpan(Number(val * 1000 * 60))}
          />
        </View>

        <View style={styles.settingsItem}>
          <Text style={styles.settingsText}>
            Break span: {breakSpan / 1000/ 60} minutes
          </Text>
          <Slider
            minimumTrackTintColor="#aaa"
            value={breakSpan/1000/60}
            style={{ height: 80 }}
            step={1}
            minimumValue={0}
            maximumValue={60}
            onValueChange={val => setBreakSpan(Number(val * 1000 * 60))}
          />
        </View>

        <View style={styles.settingsItem}>
          <Text style={styles.settingsText}>
            Long break span: {longBreakSpan / 1000 / 60} minutes
          </Text>
          <Slider
            minimumTrackTintColor="#aaa"
            value={longBreakSpan/1000/60}
            style={{ height: 80 }}
            step={1}
            minimumValue={0}
            maximumValue={60}
            onValueChange={val => setLongBreakSpan(Number(val * 1000 * 60))}
          />
        </View>

        <View style={styles.settingsItem}>
          <Text style={styles.settingsText}>
            Long break every: {longBreakEvery}
          </Text>
          <Slider
            minimumTrackTintColor="#aaa"
            value={longBreakEvery}
            style={{ height: 80 }}
            step={1}
            minimumValue={0}
            maximumValue={10}
            onValueChange={val => setLongBreakEvery(val)}
          />
      </View>

      <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  </SettingsProvider>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#eee',
  },
  mainContent: {
    paddingHorizontal: 10,
    paddingVertical: 40,
    width: screen.width,
  },
  settingsItem: {
    flexDirection: 'column',
    marginBottom: 36,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 8,
  },
  settingsText: {
    color: '#676767',
    fontWeight: '200',
    fontSize: 29,
  }
});


export default Settings;
