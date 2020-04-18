import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainView from './components/views/MainView';
import Menu from './components/views/MenuScreen';
import History from './components/views/History';

import Settings from './components/views/Settings';
import { SettingsProvider } from './components/utilities/SettingsContext';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={props => <Menu {...props} />}
    drawerType="back"
    edgeWidth={1000}
  >
      <Drawer.Screen name="Home" component={MainView} />
      <Drawer.Screen name="History" component={History} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="App" component={AppDrawer} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
}