import React, { createContext, useEffect, useRef } from 'react';

import { Platform, Vibration } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export const NotificationContext = createContext();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shoutSetBadge: false,
  })
});

const defaultNotification = {
  title: 'title',
  body: 'body',
  ios: { sound: true, _displayInForeground: true },
};

const sendNotification = (notification) => {
  Notifications.presentNotificationAsync({
    ...defaultNotification,
    ...notification,
  });
};

const sendScheduledNotification = (notification, ms) => {
  Notifications.scheduleNotificationAsync({
    content: { ...defaultNotification, ...notification },
    trigger: { seconds: Math.floor(ms / 1000)}
  }
  );
};

const cancelNotifications = () => {
  Notifications.cancelAllScheduledNotificationsAsync();
};

const askNotification = async () => {
  // We need to ask for Notification permissions for ios devices
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (Constants.isDevice && status === 'granted')
    console.log('Notification permissions granted.');

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};

export const NotificationProvider = ({ children }) => {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    askNotification();
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
      // todo: play sound that the timer is complete
    });
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      // todo: take the user to main timer, or play next timer
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        sendNotification,
        sendScheduledNotification,
        cancelNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
