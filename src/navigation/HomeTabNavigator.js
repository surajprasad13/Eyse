import React from 'react';
import {Text, View, Image, SafeAreaView} from 'react-native';

// ================ CREATE TAB NAVIGATOR ================ //
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import ExpertContentList from '../screens/expert-advice/ExpertContentList';
import ProfileTabNavigator from '../screens/influencers-profile/ProfileTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {colors} from '../theme';

const Tab = createBottomTabNavigator();

export default class HomeTabNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expert: false,
      userId: null,
      userType: '',
      loading: true,
    };
  }
  componentDidMount() {
    this.getInfluencerDetails();
  }
  async getInfluencerDetails() {
    const userToken = await AsyncStorage.getItem('userToken');

    const userId = await AsyncStorage.getItem('userId');

    const userType = await AsyncStorage.getItem('userType');

    this.setState({userId: userId});
    this.setState({userType: userType});
    this.setState({loading: false});

    if (userType == 'influencer') {
      let axiosConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken}`,
        },
      };
      let url =
        'http://18.190.154.188:9000/inflncr/getInfluencerDetails/' + userId;

      axios
        .get(url, axiosConfig)
        .then(res => {
          this.setState({expert: res.data.Data.if_expert});
          this.setState({loading: false});
        })
        .catch(err => {
          this.setState({loading: false});
        });
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color="black" />
        </View>
      );
    } else {
      return (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.text,
            tabBarInactiveTintColor: colors.primary,
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({size, color}) => (
                <Icon name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={HomeScreen}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({size, color}) => (
                <Icon name="search" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Statics"
            component={HomeScreen}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({size, color}) => (
                <Icon name="trending-up" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Store"
            component={HomeScreen}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({size, color}) => (
                <MaterialIcon name="storefront" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Contact"
            component={
              this.state.userType === 'influencer'
                ? ProfileTabNavigator
                : ExpertContentList
            }
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({size, color}) => (
                <Icon name="user" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      );
    }
  }
}
