import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default ({label, onPress, styleProps, textStyle, ...otherProps}) => {
  return (
    <TouchableOpacity
      {...otherProps}
      style={[styles.container, styleProps,]}
      onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 4,
    backgroundColor: "blue",
    marginVertical: 15,
  },
  text: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
  },
});
