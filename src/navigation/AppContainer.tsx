//@@Dev this component is the entry point of navigation for the application
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

/* screens */
import Landing from "../screens/Landing";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";
import Validation from "../screens/Validation";

/* utils */
import { RootStackParams } from "./RootStackParams";

const Stack = createStackNavigator<RootStackParams>();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Validation" component={Validation} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Auth" component={AuthNavigation} />
        <Stack.Screen name="App" component={MainNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
