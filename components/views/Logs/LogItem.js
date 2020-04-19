import React from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import { format } from 'date-fns';

const LogItem = ({ log }) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.titleText}>
        {log.project || 'No project'}
      </Text>
      <Text style={styles.detailsText}>
        {log.length ? `${log.length / 60 / 1000} minutes` : '0 minutes'}
      </Text>
    </View>
    <Text style={styles.detailsText}>
      {format(log.timeCompleted, 'dd.MM.yyyy kk:mm:ss')}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
  }
});

export default LogItem;
