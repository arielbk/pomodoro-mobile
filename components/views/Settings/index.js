import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  Slider,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import PageTitle from '../../shared/PageTitle';
import {
  SettingsProvider,
  SettingsContext,
} from '../../utilities/SettingsContext';

const screen = Dimensions.get('window');

const Settings = ({ navigation }) => {
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
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <PageTitle title="Settings" handleBack={navigation.openDrawer} />

        <ScrollView style={styles.mainContent}>
          <View style={styles.settingsItem}>
            <Text style={styles.settingsText}>Focus span:</Text>
            <TextInput
              style={styles.numericInput}
              value={String(focusSpan / 1000 / 60)}
              onChangeText={(val) => setFocusSpan(Number(val * 1000 * 60))}
              keyboardType="numeric"
            />
            <Slider
              minimumTrackTintColor="#aaa"
              value={focusSpan / 1000 / 60}
              style={{ height: 80 }}
              step={1}
              minimumValue={0}
              maximumValue={60}
              onValueChange={(val) => setFocusSpan(Number(val * 1000 * 60))}
            />
          </View>

          <View style={styles.settingsItem}>
            <Text style={styles.settingsText}>Break span:</Text>
            <TextInput
              style={styles.numericInput}
              value={String(breakSpan / 1000 / 60)}
              onChangeText={(val) => setBreakSpan(Number(val * 1000 * 60))}
              keyboardType="numeric"
            />
            <Slider
              minimumTrackTintColor="#aaa"
              value={breakSpan / 1000 / 60}
              style={{ height: 80 }}
              step={1}
              minimumValue={0}
              maximumValue={60}
              onValueChange={(val) => setBreakSpan(Number(val * 1000 * 60))}
            />
          </View>

          <View style={styles.settingsItem}>
            <Text style={styles.settingsText}>Long break span:</Text>
            <TextInput
              style={styles.numericInput}
              value={String(longBreakSpan / 1000 / 60)}
              onChangeText={(val) => setLongBreakSpan(Number(val * 1000 * 60))}
              keyboardType="numeric"
            />
            <Slider
              minimumTrackTintColor="#aaa"
              value={longBreakSpan / 1000 / 60}
              style={{ height: 80 }}
              step={1}
              minimumValue={0}
              maximumValue={60}
              onValueChange={(val) => setLongBreakSpan(Number(val * 1000 * 60))}
            />
          </View>

          <View style={styles.settingsItem}>
            <Text style={styles.settingsText}>Long break every:</Text>
            <TextInput
              style={styles.numericInput}
              value={String(longBreakEvery)}
              onChangeText={(val) => setLongBreakEvery(val)}
              keyboardType="numeric"
            />
            <Slider
              minimumTrackTintColor="#aaa"
              value={longBreakEvery}
              style={{ height: 80 }}
              step={1}
              minimumValue={0}
              maximumValue={10}
              onValueChange={(val) => setLongBreakEvery(val)}
            />
          </View>

          <View style={{ height: 80 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SettingsProvider>
  );
};

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
    fontWeight: '300',
    fontSize: 24,
  },
  numericInput: {
    fontSize: 28,
    width: 100,
    alignSelf: 'center',
    color: '#aaa',
    padding: 10,
    margin: 18,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Settings;
