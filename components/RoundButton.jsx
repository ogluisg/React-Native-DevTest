import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default ({label, onPress, styleProps, textStyle, disabled = false}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, styleProps]}
      onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    width: 200,
  },
  text: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 30,
  },
});
