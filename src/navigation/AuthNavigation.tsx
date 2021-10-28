//@@Dev this component handles navigation for authentication
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthLanding from "../screens/Auth/AuthLanding";
import Login from "../screens/Auth/Login";
import Create from "../screens/Auth/Create/index";
import Password from "../screens/Auth/Password";
import PasswordSet from "../screens/Auth/PasswordSet";
import Register from "../screens/Auth/Register";
import Recover from "../screens/Auth/Recover/index";
// import Hydro from "../screens/Auth/Create/Hydro"
import Permissions from "../screens/Auth/Create/Permissions";
import Claim from "../screens/Auth/Create/Claim";

import Mnemonic from "../screens/Mnemonic/index";
import Validate from "../screens/Mnemonic/Validate";
import { RootStackParams } from "./RootStackParams";


const Stack = createStackNavigator<RootStackParams>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AuthLanding" component={AuthLanding} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="Create" component={Create} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="PasswordSet" component={PasswordSet} />
      <Stack.Screen name="Recover" component={Recover} />
      <Stack.Screen name="permissions" component={Permissions} />
      <Stack.Screen name="claim" component={Claim} />
      {/* <Stack.Screen name="hydro" compopnent={Hydro}/>  */}
      <Stack.Screen name="Mnemonic" component={Mnemonic} />
      <Stack.Screen name="validate" component={Validate} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
