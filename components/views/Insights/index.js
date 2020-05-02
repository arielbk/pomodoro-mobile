import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
} from 'react-native';
import PageTitle from '../../shared/PageTitle';

export default function Insights({ navigation }) {
  console.log('rendering revolut chart');

  return (
    <SafeAreaView style={styles.root}>
      <PageTitle title="Insights" handleBack={navigation.toggleDrawer} />
      <Text>
        Insights
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
