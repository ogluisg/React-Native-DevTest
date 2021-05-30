import { useNavigation } from "@react-navigation/core";
import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RoundButton, TextInput } from "../../../components";
import authContext from "../../../contexts/authContext";
import MainContoller from "../../../controllers/MainContoller";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(authContext);
  const navigation = useNavigation();

  const fields = [
    {
      placeholder: "Email Address",
      value: email,
      onChange: (text) => setEmail(text),
      secureTextEntry: false,
    },
    {
      placeholder: "Password",
      value: password,
      onChange: (text) => setPassword(text),
      secureTextEntry: true,
    },
  ];

  const login = async () => {
    const token = await MainContoller.login(email, password);
    if (token) {
      setToken(token);
      setEmail("");
      setPassword("");
      navigation.navigate("UserTable");
    } else {
      alert("Incorrect login credentials...");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome...</Text>
      {fields.map((field, index) => (
        <TextInput
          key={index}
          field={field}
          otherStyleProps={styles.textinput}
        />
      ))}
      <RoundButton onPress={login} styleProps={styles.button} label="Sign In" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: "25%",
  },
  textinput: {
    marginVertical: 20,
    borderRadius: 10,
    borderColor: "blue",
    borderWidth: 1,
    width: 200,
  },
  button: {
    backgroundColor: "blue",
    marginTop: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
