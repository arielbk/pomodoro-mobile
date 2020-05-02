import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import PageTitle from '../../shared/PageTitle';
import BarChart from '../../shared/BarChart';

const testData = [
  { label: 'Sun', value: 5 },
  { label: 'Mon', value: 7 },
  { label: 'Tue', value: 8 },
  { label: 'Wed', value: 2 },
  { label: 'Thu', value: 1 },
  { label: 'Fri', value: 6 },
  { label: 'Sat', value: 9 },
];

export default function Insights({ navigation }) {
  return (
    <>
      <PageTitle title="Insights" handleBack={navigation.toggleDrawer} />
      <SafeAreaView style={styles.container}>
        <BarChart data={testData} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
