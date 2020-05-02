import React, { useContext } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { differenceInDays, formatDistanceToNow } from 'date-fns';
import PageTitle from '../../shared/PageTitle';
import LogItem from './LogItem';
import { LogsContext } from '../../utilities/LogsContext';

export default ({ navigation }) => {
  const { pomodoroLog } = useContext(LogsContext);

  const sectionLog = [];

  pomodoroLog
    .sort((a, b) => b.timeCompleted - a.timeCompleted)
    .forEach((log) => {
      let header;
      const daysAgo = differenceInDays(Date.now(), log.timeCompleted);
      if (daysAgo < 1) {
        header = 'Today';
      } else if (daysAgo === 1) {
        header = 'Yesterday';
      } else {
        header = formatDistanceToNow(log.timeCompleted, { addSuffix: true });
      }

      const existingTitle = sectionLog.find(
        (section) => section.title === header
      );

      if (existingTitle) {
        existingTitle.data.push(log);
      } else {
        sectionLog.push({
          title: header,
          data: [log],
        });
      }
    });

  return (
    <View style={styles.container}>
      <PageTitle title="Log" handleBack={navigation.toggleDrawer} />
      <SectionList
        sections={sectionLog}
        keyExtractor={(log) => log.timeCompleted}
        renderItem={({ item }) => <LogItem log={item} />}
        renderSectionHeader={({ section: { title, data } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.headerText}>{title}</Text>
            <Text style={styles.headerCount}>{data.length}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: '#ddd',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerCount: {
    fontSize: 20,
    fontWeight: '300',
    color: '#777',
  },
});
