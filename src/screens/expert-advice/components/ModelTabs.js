import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "../styles";

export default class ModelTabs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={[
          styles.modelTextWrapper,
          { borderBottomWidth: this.props.last ? 0 : 1 },
        ]}
      >
        <Text style={{ ...styles.secondarySText, fontSize: 18 }}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}
