import React from 'react';
import { StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

export default props => {
  return (
    <DrawerContentScrollView {...props} styles={styles.container}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
