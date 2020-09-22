import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProjectInput = ({ addProject }) => {
  const [text, setText] = useState('');

  const handleAddProject = () => {
    addProject(text);
    setText('');
  };

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TextInput
        style={styles.input}
        onChangeText={(val) => setText(val)}
        value={text}
        placeholder="New project..."
      />
      <TouchableOpacity onPress={handleAddProject}>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-add-circle' : 'ios-add-circle'}
          color="#aaa"
          size={42}
        />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 21,
    borderRadius: 5,
    margin: 8,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '85%',
    padding: 8,
    marginVertical: 8,
  },
});

export default ProjectInput;
