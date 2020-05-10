import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, Picker } from 'react-native';
import {
  differenceInDays,
  subDays,
  isWithinInterval,
  isEqual,
  setDay,
} from 'date-fns';
import { scaleTime } from 'd3-scale';
import PageTitle from '../../shared/PageTitle';
import BarChart from '../../shared/BarChart';
import { LogsContext } from '../../utilities/LogsContext';

export default function Insights({ navigation }) {
  const { pomodoroLog } = useContext(LogsContext);
  const [days, setDays] = useState(7);

  const interval = { start: subDays(new Date(), days), end: new Date() };
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
        <Picker
          selectedValue={days}
          onValueChange={(val) => setDays(val)}
          style={{
            height: 100,
            width: 200,
            marginTop: -50,
            marginBottom: 50,
          }}
        >
          <Picker.Item label="Last week" value={7} />
          <Picker.Item label="Last 2 weeks" value={14} />
          <Picker.Item label="Last month" value={30} />
        </Picker>
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
