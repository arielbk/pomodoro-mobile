import React, { useRef } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Ionicons } from '@expo/vector-icons';

const RadioButton = ({ isSelected }) => (
  <View
    style={{
      height: 24,
      width: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 24,
    }}
  >
    {isSelected ? (
      <View
        style={{
          height: 12,
          width: 12,
          borderRadius: 6,
          backgroundColor: '#777',
        }}
      />
    ) : null}
  </View>
);

const RightActions = (progress, dragX) => {
  console.log(dragX);
  const opacity = dragX.interpolate({
    inputRange: [-100, -50, 0],
    outputRange: [1, 0.2, 0],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View style={[styles.rightAction, { opacity }]}>
      <Text style={styles.deleteText}>Delete</Text>
      <Ionicons
        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
        color="#ffffff"
        size={42}
      />
    </Animated.View>
  );
};

const Project = ({ title, isSelected, setSelected, removeProject }) => {
  const swipeable = useRef();
  const confirmDelete = () => {
    Alert.alert(
      'Delete project',
      `Are you sure you want to delete the project, ${title}?`,
      [
        {
          text: 'Cancel',
          onPress: () => swipeable.current.close(),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            swipeable.current.close();
            removeProject(title);
          },
        },
      ]
    );
  };
  return (
    <Swipeable
      ref={swipeable}
      renderRightActions={RightActions}
      overshootRight={false}
      onSwipeableRightOpen={confirmDelete}
    >
      <TouchableOpacity onPress={() => setSelected(title)}>
        <View style={styles.container}>
          <RadioButton isSelected={isSelected} />
          <Text style={styles.projectText}>{title}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 24,
    borderRadius: 5,
    marginHorizontal: 8,
    marginVertical: 1,
  },
  projectText: {
    fontSize: 16,
  },
  rightAction: {
    marginRight: 8,
    marginLeft: -8,
    marginVertical: 1,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5A3C',
  },
  deleteText: {
    color: '#ffffff',
    fontSize: 18,
    marginRight: 28,
    fontWeight: '600',
  },
});

export default Project;
