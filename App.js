import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainView from './components/views/MainView';
import Settings from './components/views/Settings';
import { SettingsProvider } from './components/utilities/SettingsContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={MainView} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
}