import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import PageTitle from '../shared/PageTitle';

export default ({ navigation }) => (
  <>
    <PageTitle title="Learn" handleBack={navigation.toggleDrawer} />
    <ScrollView style={styles.container}>
      <Text style={styles.header}>What it is</Text>
      <View style={styles.pView}>
        <Text style={styles.pText}>
          The app helps you implement the 'Pomodoro Technique', a method to
          boost your focus and productivity, and beat procrastination.
        </Text>
      </View>
      <Text style={styles.header}>How it works</Text>
      <View style={styles.pView}>
        <Text style={styles.pText}>
          The idea is simple but effective, and works by breaking your time down
          into chunks.
        </Text>
      </View>
      <View style={styles.pView}>
        <Text style={styles.pText}>
          A timer will determine how long you want to focus for (this is 25
          minutes by default). You should already have a concrete idea of the
          tasks you want to complete.
        </Text>
      </View>
      <View style={styles.pView}>
        <Text style={styles.pText}>
          Start the timer and focus. Once it's finished, you've completed a
          pomodoro!
        </Text>
      </View>
      <View style={styles.pView}>
        <Text style={styles.pText}>
          It's time to start you're break timer' (this is 5 minutes by default).
          Step away from what you are doing, and let it rest. Maybe stand up and
          walk around.
        </Text>
      </View>
      <View style={styles.pView}>
        <Text style={styles.pText}>
          Once the break time ends, it's time to focus again. Repeat the process
          and complete another pomodoro.
        </Text>
      </View>
      <View style={styles.pView}>
        <Text style={styles.pText}>
          Once you have completed a set (4 pomodoros by default), it's time for
          a long break (15 minutes default). Step away from what you were doing,
          and let it rest for a while longer. Maybe take a walk.
        </Text>
      </View>
      <View style={styles.pView}>
        <Text style={styles.pText}>
          That's all there is to it! Simple right?
        </Text>
      </View>
      <View style={[styles.pView, { marginBottom: 100 }]}>
        <Text style={styles.pText}>But incredibly effective.</Text>
      </View>
    </ScrollView>
  </>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 36,
    paddingHorizontal: 16,
  },
  pView: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 12,
  },
  pText: {
    color: '#555',
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: '400',
    color: '#777',
    marginTop: 24,
    marginBottom: 18,
  },
});
