import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { subWeeks, isWithinInterval } from 'date-fns';
import PageTitle from '../../shared/PageTitle';
import BarChart from '../../shared/BarChart';
import { LogsContext } from '../../utilities/LogsContext';

const testData = [
  { label: new Date(2020, 3, 26), value: 5 },
  { label: new Date(2020, 3, 27), value: 7 },
  { label: new Date(2020, 3, 28), value: 8 },
  { label: new Date(2020, 3, 29), value: 2 },
  { label: new Date(2020, 3, 30), value: 1 },
  { label: new Date(2020, 4, 1), value: 6 },
  { label: new Date(2020, 4, 2), value: 9 },
];

export default function Insights({ navigation }) {
  const { pomodoroLog } = useContext(LogsContext);
  const interval = { start: subWeeks(new Date(), 1), end: new Date() };
  const logData = pomodoroLog
    .filter((log) => isWithinInterval(log.timeCompleted, interval))
    .map((log) => ({ label: new Date(log.timeCompleted), value: 1 }));

  // chartData = [];
  // pomodoroLog
  //   .filter((log) => log.timeCompleted > subWeeks(new Date(), 4))
  //   .sort((a, b) => a.timeCompleted - b.timeCompleted)
  //   .forEach((log) => {
  //     let header = ;

  //     const existingTitle = sectionLog.find(
  //       (section) => section.title === header
  //     );

  //     if (existingTitle) {
  //       existingTitle.data.push(log);
  //     } else {
  //       sectionLog.push({
  //         title: header,
  //         data: [log],
  //       });
  //     }
  //   });

  return (
    <>
      <PageTitle title="Insights" handleBack={navigation.toggleDrawer} />
      <SafeAreaView style={styles.container}>
        <BarChart data={logData} interval={interval} />
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
