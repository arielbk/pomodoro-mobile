import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function MenuScreen(props) {
  return (
    <DrawerContentScrollView {...props} styles={styles.container}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        icon={({ focused, color, size }) => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
            color={color}
            size={size}
          />
        )}
        {...props}
        style={{ paddingHorizontal: 20 }}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
  },
});
