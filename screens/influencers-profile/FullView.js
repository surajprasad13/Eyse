import React, { Component } from "react";
import { View, Image, Dimensions, SafeAreaView, StatusBar } from "react-native";
import styles from "../post/styles";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class FullView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: this.props.route.params.image.uri,
    };
  }

  render() {
    console.log(this.props.route.params.image);
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{
            marginTop: StatusBar.currentHeight + 10,
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: this.state.uri }}
            style={{ width: width, height: height }}
          />
        </SafeAreaView>
      </View>
    );
  }
}
