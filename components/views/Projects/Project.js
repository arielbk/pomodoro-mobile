import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';

const RadioButton = ({ isSelected }) => {
  return (
      <View style={{
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 24,
      }}>
        {
          isSelected ?
            <View style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#777',
            }}/>
            : null
        }
      </View>
  );
}

const Project = ({ title, isSelected, setSelected }) => (
  <TouchableOpacity onPress={() => setSelected(title)}>
    <View style={styles.container}>
      <RadioButton isSelected={isSelected} />
      <Text style={styles.projectText}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 24,
    borderRadius: 5,
    margin: 8,
  },
  projectText: {
    fontSize: 16,
  }
});

export default Project;
