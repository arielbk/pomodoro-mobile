import React, { createContext, useEffect } from 'react';

import { Platform, Vibration } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export const NotificationContext = createContext();

const defaultNotification = {
  title: 'title',
  body: 'body',
  ios: { sound: true, _displayInForeground: true },
};

const sendNotification = (notification) => {
  Notifications.presentLocalNotificationAsync({
    ...defaultNotification,
    notification,
  });
};
const handleNotification = (notification) => {
  Vibration.vibrate();
  console.log('Received a notification:', notification);
};

const askNotification = async () => {
  // We need to ask for Notification permissions for ios devices
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (Constants.isDevice && status === 'granted')
    console.log('Notification permissions granted.');
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }
};

export const NotificationProvider = ({ children }) => {
  useEffect(() => {
    askNotification();
    // If we want to do something with the notification when the app
    // is active, we need to listen to notification events and
    // handle them in a callback
    const listener = Notifications.addListener(handleNotification);
    return () => listener.remove();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        sendNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
