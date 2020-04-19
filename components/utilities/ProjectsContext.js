import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projectList, setProjectList] = useState(['Pomodoro app', 'Voting', 'Maths']);
  const [selectedProject, setSelectedProject] = useState('');

  const loadSavedProjectList = async () => {
    try {
      const storedProjectList = await AsyncStorage.getItem('projectList');
      const parsedProjectList = JSON.parse(storedProjectList);
      if (parsedProjectList) {
        setProjectList(parsedProjectList)
      }
    } catch (error) {
      console.error(error);
    }
  }

  // load saved project list on mount
  useEffect(() => {
    loadSavedProjectList();
  }, []);

  // save project list on change
  useEffect(() => {
    try {
      AsyncStorage.setItem('projectList', JSON.stringify(projectList));
    } catch (error) {
      console.error(error);
    }
  }, [projectList]);

  const addProject = project => {
    setProjectList(prev => ([...prev, project]));
    setSelectedProject(project);
  };
  const removeProject = project => setProjectList(prev => prev.filter(name => name !== project))

  return (
    <ProjectsContext.Provider value={{
      projectList,
      selectedProject,
      setSelectedProject,
      addProject,
      removeProject,
    }}>
      {children}
    </ProjectsContext.Provider>
  )
}