import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import MainView from './components/views/MainView';
import Menu from './components/views/MenuScreen';
import Logs from './components/views/Logs';
import Learn from './components/views/Learn';
import Insights from './components/views/Insights';

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
    drawerStyle={{
      width: 300,
      justifyContent: 'center',
      paddingTop: 60,
    }}
    drawerContentOptions={{
      labelStyle: {
        fontSize: 24,
        fontWeight: '300',
        marginVertical: 10,
        marginLeft: 4
      },
      itemStyle: {
        paddingHorizontal: 18,
        // justifyContent: 'center',
        // alignItems: 'center',
      },
      activeTintColor: '#000',
      activeBackgroundColor: '#fff',
      inactiveTintColor: '#bbb',
    }}
  >
      <Drawer.Screen
        name="Home"
        component={MainView}
        options={{
          drawerIcon: ({ focused, color, size }) =>
            <Ionicons name={Platform.OS === 'android' ? 'md-home' : 'ios-home'} color={color} size={size} />
        }}
      />
      <Drawer.Screen
        name="Insights"
        component={Insights}
        options={{
          drawerIcon: ({ focused, color, size }) =>
            <Ionicons name={Platform.OS === 'android' ? 'md-pulse' : 'ios-pulse'} color={color} size={size} />
        }}  
      />
      <Drawer.Screen
        name="Logs"
        component={Logs}
        options={{
          drawerIcon: ({ focused, color, size }) =>
            <Ionicons name={Platform.OS === 'android' ? 'md-document' : 'ios-document'} color={color} size={size} />
        }}  
      />
      <Drawer.Screen
        name="Learn"
        component={Learn}
        options={{
          drawerIcon: ({ focused, color, size }) =>
            <Ionicons name={Platform.OS === 'android' ? 'md-bookmark' : 'ios-book'} color={color} size={size} />
        }}  
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ focused, color, size }) =>
            <Ionicons name={Platform.OS === 'android' ? 'md-settings' : 'ios-settings'} color={color} size={size} />
        }}  
      />
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