import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import { Button } from "../components";
import AuthContext from "../contexts/authContext";
import SurveyTableScreen from "../screens/Task1/SurveyTableScreen";
import UserTableScreen from "../screens/Task2/LoggedIn/UserTableScreen";
import LoginScreen from "../screens/Task2/LoggedOut/LoginScreen";

const Stack = createStackNavigator();

const RootNavigator = () => {
  const [token, setToken] = useState(null);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SurveyTable"
            component={SurveyTableScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <NavHeader
                  icon={"arrow"}
                  alignLeft={false}
                  onPress={() =>
                    navigation.navigate(token ? "UserTable" : "Login")
                  }
                />
              ),
            })}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={({ navigation }) => ({
              headerTintColor: "#fff",
              headerLeft: () => (
                <NavHeader
                  icon={"arrow"}
                  alignLeft={true}
                  onPress={() => navigation.navigate("SurveyTable")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="UserTable"
            component={UserTableScreen}
            options={({ navigation }) => ({
              headerTintColor: "#fff",
              headerLeft: () => (
                <NavHeader
                  icon={"arrow"}
                  alignLeft={true}
                  onPress={() =>
                    navigation.navigate(token ? "SurveyTable" : "Login")
                  }
                />
              ),
              headerRight: () => {
                const onPress = () => {
                  setToken(null);
                  navigation.navigate("Login");
                };
                if (Platform.OS == "web") {
                  return (
                    <Button
                      label="LOGOUT"
                      styleProps={{ marginRight: 15 }}
                      onPress={onPress}
                    />
                  );
                }
                return (
                  <View style={styles.container}>
                    <Dropdown
                      underlineColor={"white"}
                      parentDDContainerStyle={{ width: 70 }}
                      label=""
                      data={[{ label: "logout" }]}
                      onChange={onPress}
                    />
                  </View>
                );
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const NavHeader = ({ onPress, icon, alignLeft = null }) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        alignLeft ? { marginLeft: 25 } : { marginRight: 25 },
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={`${icon}${
          alignLeft === null ? "" : alignLeft == true ? "-left" : "-right"
        }`}
        size={30}
        color="black"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    marginBottom: 5,
  },
  container: {
    marginRight: 20,
    marginTop: -10,
    flex: 1,
  },
});

export default RootNavigator;
