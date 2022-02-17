import React from "react";
import { Text, View, Image } from "react-native";

// ================ CREATE TAB NAVIGATOR ================ //
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import ExpertContentList from "../screens/expert-advice/ExpertContentList";
import ProfileTabNavigator from "../screens/influencers-profile/ProfileTabNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
const Tab = createBottomTabNavigator();

export default class HomeTabNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expert: false,
      userId: null,
      userType: "",
      loading: true,
    };
  }
  componentDidMount() {
    this.getInfluencerDetails();
  }
  async getInfluencerDetails() {
    const userToken = await AsyncStorage.getItem("userToken");
    const userId = await AsyncStorage.getItem("userId");

    const userType = await AsyncStorage.getItem("userType");

    this.setState({ userId: userId });
    this.setState({ userType: userType });
    this.setState({ loading: false });

    if (userType == "influencer") {
      let axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWJlZTJjMzg3Nzg1ZjA5NzljY2ZiY2EiLCJlbWFpbCI6InRhbWFuQDEyMy5nbWFpbC5jb20iLCJtb2JpbGUiOiI3MDA3MzMyNzI3IiwiaWF0IjoxNjQxNjI0OTc0LCJleHAiOjE2NDQyMTY5NzR9.7DYVd6nVLLpi1-nGsOwE7pudxfkcTN1gHZTFarMQdAQ",
        },
      };
      let url =
        "http://18.190.154.188:9000/inflncr/getInfluencerDetails/" + userId;

      axios
        .get(url, axiosConfig)
        .then((res) => {
          console.log("RESPONSE RECEIVED: ", res.data);
          this.setState({ expert: res.data.Data.if_expert });
          this.setState({ loading: false });
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
          this.setState({ loading: false });
        });
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={"large"} color="black" />
        </View>
      );
    } else {
      return (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              height: 60,
            },
            tabBarActiveTintColor: "#2362FB",
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color }) => (
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/icons/home.png")}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={HomeScreen}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color }) => (
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/icons/search.png")}
                    style={{
                      width: 34,
                      height: 34,
                    }}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Statics"
            component={HomeScreen}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color }) => (
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/icons/statics.png")}
                    style={{
                      width: 34,
                      height: 24,
                    }}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Store"
            component={HomeScreen}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color }) => (
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/icons/store.png")}
                    style={{
                      width: 36,
                      height: 36,
                    }}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Contact"
            component={
              this.state.userType === "influencer"
                ? ProfileTabNavigator
                : ExpertContentList
            }
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color }) => (
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/icons/contact_phone.png")}
                    style={{
                      width: 35,
                      height: 35,
                    }}
                  />
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      );
    }
  }
}
