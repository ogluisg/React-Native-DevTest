import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import AuthContext from "../contexts/authContext";
import SurveyTableScreen from "../screens/Task1/SurveyTableScreen";
import UserTableScreen from "../screens/Task2/LoggedIn/UserTableScreen";
import LoginScreen from "../screens/Task2/LoggedOut/LoginScreen";

const Stack = createStackNavigator();

const RootNavigator = () => {
  const [token, setToken] = useState(null);
  const menuArray = ["Logout"];

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
            options={{ headerTintColor: "#fff" }}
            options={({ navigation }) => ({
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
            options={{ headerTintColor: "#fff" }}
            options={({ navigation }) => ({
              headerLeft: () => (
                <NavHeader
                  icon={"arrow"}
                  alignLeft={true}
                  onPress={() =>
                    navigation.navigate(token ? "SurveyTable" : "Login")
                  }
                />
              ),
              headerRight: () => (
                <ModalDropdown
                  options={menuArray}
                  dropdownStyle={{
                    height: 40 * menuArray.length,
                    alignItems: "center",
                  }}
                  defaultValue={"Menu"}
                  animated={true}
                  dropdownTextStyle={{ fontSize: 20, color: "black" }}
                  textStyle={{ fontSize: 20, marginRight: 5, color: "black" }}
                  customButton="⋮"
                  onSelect={() => {
                    setToken(null);
                    navigation.navigate("Login");
                  }}
                />
              ),
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
        name={`${icon}${alignLeft === null ? "" : alignLeft == true ? "-left" : "-right"}`}
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
});

export default RootNavigator;
