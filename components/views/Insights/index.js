import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import {
  differenceInDays,
  subWeeks,
  isWithinInterval,
  isEqual,
} from 'date-fns';
import { scaleTime } from 'd3-scale';
import PageTitle from '../../shared/PageTitle';
import BarChart from '../../shared/BarChart';
import { LogsContext } from '../../utilities/LogsContext';

export default function Insights({ navigation }) {
  const { pomodoroLog } = useContext(LogsContext);
  const interval = { start: subWeeks(new Date(), 1), end: new Date() };
  const selectedLogs = pomodoroLog.filter((log) =>
    isWithinInterval(log.timeCompleted, interval)
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
});
