import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnBoarding from "../screens/onboarding/OnBoarding";
import Login from "../screens/onboarding/Login";
import SignUp from "../screens/onboarding/SignUp";
import ForgotPassword from "../screens/onboarding/ForgotPassword";
import NewPassword from "../screens/onboarding/NewPassword";
import Success from "../constants/Success";
import Interests from "../screens/onboarding/Interests";
import RootStackNavigation from "./RootStackNavigation";
import ProfileTabNavigator from "../screens/influencers-profile/ProfileTabNavigator";
import HomeStack from "./HomeStack";

const Stack = createNativeStackNavigator();

export default class AuthStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Stack.Navigator
        initialRouteName="OnBoarding"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen
          name="RootStackNavigation"
          component={RootStackNavigation}
        />
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
