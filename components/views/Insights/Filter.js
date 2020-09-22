import React, { useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Picker,
  Dimensions,
} from 'react-native';
import { FilterContext } from './InsightsContext';
import { ProjectsContext } from '../../utilities/ProjectsContext';

const screen = Dimensions.get('window');

function InsightsFilter({ navigation }) {
  const { days, setDays, project, setProject } = useContext(FilterContext);
  const { projectList } = useContext(ProjectsContext);
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Insight Filters</Text>
        <Text style={styles.subtitle}>Timer period:</Text>
        <Picker
          selectedValue={days}
          onValueChange={(val) => setDays(val)}
          style={styles.picker}
        >
          <Picker.Item label="Last week" value={7} />
          <Picker.Item label="Last 2 weeks" value={14} />
          <Picker.Item label="Last month" value={30} />
        </Picker>
        <Text style={styles.subtitle}>Project:</Text>
        <Picker
          selectedValue={project}
          onValueChange={(val) => setProject(val)}
          style={styles.picker}
        >
          <Picker.Item label="All" value={null} />
          {projectList.map((proj) => (
            <Picker.Item label={proj} value={proj} key={proj} />
          ))}
        </Picker>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: screen.height - 80,
    marginTop: 80,
  },
  title: {
    color: '#676767',
    fontSize: 24,
    fontWeight: '500',
  },
  subtitle: {
    color: '#676767',
    marginTop: 60,
    fontSize: 18,
    fontWeight: '500',
  },
  picker: {
    height: 180,
    width: 200,
    marginBottom: 30,
  },
  confirmText: {
    marginBottom: 40,
    fontSize: 21,
    textDecorationLine: 'underline',
  },
});

export default InsightsFilter;
