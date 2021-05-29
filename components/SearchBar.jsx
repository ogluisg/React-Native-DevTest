import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default ({ keyword, handleSearchKeyword, placeholder }) => {
  return (
    <TextInput
      style={styles.container}
      value={keyword}
      placeholder={placeholder}
      onChange={(e) => handleSearchKeyword(e.nativeEvent.text)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#F2F1F9",
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 10,
  },
});
