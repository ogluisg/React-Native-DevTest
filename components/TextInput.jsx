import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

export default ({field, otherStyleProps = {}, ...otherProps}) => {
  return (
    <>
      <TextInput
        {...otherProps}
        autoCapitalize={'none'}
        value={field.value}
        onChangeText={field.onChange}
        style={[styles.container, otherStyleProps]}
        placeholder={field.placeholder}
        secureTextEntry={field.secureTextEntry}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#FFF',
    marginBottom: 8,
    borderRadius: 6,
  },
});
