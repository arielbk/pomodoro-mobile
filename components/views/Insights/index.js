import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { differenceInDays, subDays, isWithinInterval, isEqual } from 'date-fns';
import { scaleTime } from 'd3-scale';
import { AntDesign } from '@expo/vector-icons';
import PageTitle from '../../shared/PageTitle';
import BarChart from '../../shared/BarChart';
import { LogsContext } from '../../utilities/LogsContext';
import { FilterContext } from './InsightsContext';

export default function Insights({ navigation }) {
  const { pomodoroLog } = useContext(LogsContext);
  const { days, project } = useContext(FilterContext);

  const interval = { start: subDays(new Date(), days), end: new Date() };
  const selectedLogs = pomodoroLog.filter(
    (log) =>
      (isWithinInterval(log.timeCompleted, interval) && !project) ||
      log.project === project
  );

  let logCount = [];
  scaleTime()
    .domain([interval.start, interval.end])
    .ticks(differenceInDays(interval.end, interval.start))
    .forEach((tick) =>
      logCount.push({
        label: tick,
        value: 0,
      })
    );

  selectedLogs.forEach((log) => {
    const selectedDate = new Date(log.timeCompleted);

    const label = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

    const existingEntry = logCount.find((entry) => isEqual(entry.label, label));

    if (existingEntry) {
      existingEntry.value += 1;
    } else {
      logCount.push({
        label,
        value: 1,
      });
    }
  });

  logCount = logCount
    .slice()
    .sort((a, b) => a.label.getTime() - b.label.getTime());

  return (
    <>
      <PageTitle title="Insights" handleBack={navigation.toggleDrawer} />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('InsightsFilter')}
          style={styles.filterButton}
        >
          <Text style={styles.filterButtonText}>Filter</Text>
          <AntDesign name="filter" size={24} color="#888" />
        </TouchableOpacity>
        <BarChart data={logCount} interval={interval} />
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
  filterButton: {
    flexDirection: 'row',
    marginTop: -48,
    marginBottom: 18,
    alignSelf: 'flex-end',
    marginRight: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterButtonText: {
    color: '#333',
    fontSize: 18,
    marginRight: 16,
  },
});
