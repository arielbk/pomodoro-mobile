import React, { useContext } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  FlatList,
} from 'react-native';
import PageTitle from '../../shared/PageTitle';
import Project from './Project';
import ProjectInput from './ProjectInput';
import { ProjectsContext } from '../../utilities/ProjectsContext';

export default function Projects({ navigation }) {
  const {
    projectList,
    selectedProject,
    setSelectedProject,
    addProject,
  } = useContext(ProjectsContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <PageTitle title="Projects" handleBack={navigation.goBack} isNested />
      <FlatList
        style={{ paddingTop: 30 }}
        data={projectList}
        renderItem={({ item }) => (
          <Project
            title={item}
            isSelected={selectedProject === item}
            setSelected={() => setSelectedProject(item)}
          />
        )}
        keyExtractor={(item) => item}
        ListHeaderComponent={
          <Project
            title="No project"
            isSelected={!selectedProject}
            setSelected={() => setSelectedProject('')}
          />
        }
        ListFooterComponent={<ProjectInput addProject={addProject} />}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
