import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styles from "./styles";

import VideoType from "./video-post/VideoType";

class Types extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        activeOpacity={1}
        style={{
          marginHorizontal: 30,
          ...styles.row,
          borderBottomWidth: 1,
          borderColor: "#E6E8EC",
          paddingVertical: 40,
        }}
      >
        <View
          style={{
            backgroundColor: "#F2F7FD",
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            elevation: 3,
            marginRight: 50,
          }}
        >
          <Image
            source={this.props.icon}
            style={{
              width: 70,
              height: 70,
            }}
          />
        </View>
        <Text style={{ ...styles.primaryMText }}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

export default class PostType extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ ...styles.headerWrapper }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("ProfileTabNavigator");
            }}
          >
            <Image
              source={require("../../assets/icons/back.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <Text style={{ ...styles.primaryLTextBold, marginLeft: 10 }}>
            Choose type of post
          </Text>
        </SafeAreaView>

        <Types
          icon={require("../../assets/icons/dashboard.png")}
          label="Image"
          onPress={() => {
            this.props.navigation.navigate("ChooseImage");
          }}
        />
        <Types
          icon={require("../../assets/icons/video_library.png")}
          label="Video"
          onPress={() => {
            this.props.navigation.navigate("VideoType");
          }}
        />
        <Types
          icon={require("../../assets/icons/history.png")}
          label="Thoughts & tips"
          onPress={() => {
            this.props.navigation.navigate("TextPost");
          }}
        />
      </View>
    );
  }
}
