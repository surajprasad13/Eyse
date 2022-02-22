import React, {Component} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import styles from './styles';
import YourProfile from './YourProfile';
import InfluencerZone from './InfluencerZone';
import colors from '../../constants/colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {fonts} from '../../theme';
const Tab = createMaterialTopTabNavigator();

export default class ProfileTabNavigator extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            ...styles.container,
          }}>
          <Tab.Navigator
            initialRouteName={'YourProfile'}
            screenOptions={{
              tabBarLabelStyle: {fontFamily: fonts.bold},
              tabBarIndicatorStyle: {
                height: 5,
              },
              tabBarActiveTintColor: colors.primaryBackground,
              tabBarPressColor: colors.primaryBackground,
            }}>
            <Tab.Screen
              options={{tabBarLabel: 'Influencer zone'}}
              name="InfluencerZone"
              component={InfluencerZone}
            />
            <Tab.Screen
              options={{tabBarLabel: 'Your Profile'}}
              name="YourProfile"
              component={YourProfile}
            />
          </Tab.Navigator>
        </View>
      </SafeAreaView>
    );
  }
}
