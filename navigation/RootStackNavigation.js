import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Success from "../constants/Success";
import HomeStack from "../navigation/HomeStack";
import ProfileTabNavigator from "../screens/influencers-profile/ProfileTabNavigator";
import Interests from "../screens/onboarding/Interests";
import Login from "../screens/onboarding/Login";
import SignUp from "../screens/onboarding/SignUp";
import ForgotPassword from "../screens/onboarding/ForgotPassword";
import NewPassword from "../screens/onboarding/NewPassword";

const Stack = createNativeStackNavigator();

export default class RootStackNavigation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Stack.Navigator
        initialRouteName="HomeStack"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="ProfileTabNavigator"
          component={ProfileTabNavigator}
        />
        <Stack.Screen name="HomeStack" component={HomeStack} />
        <Stack.Screen name="Interests" component={Interests} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="Success" component={Success} />
      </Stack.Navigator>
    );
  }
}
