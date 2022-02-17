import React, { Component } from "react";
import { StatusBar, View } from "react-native";
import styles from "./styles";
import YourProfile from "./YourProfile";
import InfluencerZone from "./InfluencerZone";
import colors from "../../constants/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

export default class ProfileTabNavigator extends Component {
  render() {
    return (
      <View
        style={{
          ...styles.container,
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <Tab.Navigator
          initialRouteName={"YourProfile"}
          screenOptions={{
            tabBarLabelStyle: { fontFamily: "NotoSans_700Bold" },
            tabBarIndicatorStyle: {
              height: 5,
            },
            tabBarActiveTintColor: colors.primaryBackground,
            tabBarPressColor: colors.primaryBackground,
          }}
        >
          <Tab.Screen
            options={{ tabBarLabel: "Influencer zone" }}
            name="InfluencerZone"
            component={InfluencerZone}
          />
          <Tab.Screen
            options={{ tabBarLabel: "Your Profile" }}
            name="YourProfile"
            component={YourProfile}
          />
        </Tab.Navigator>
      </View>
    );
  }
}
