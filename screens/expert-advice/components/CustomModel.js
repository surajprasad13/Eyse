import React, { Component } from "react";
import {
  View,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import styles from "../styles";
import ModelTabs from "./ModelTabs";

export class CustomModel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        animationType="faded"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.props.onPressCondition}
          style={styles.modelContainer}
        >
          <View style={styles.modelWrapper}>
            <TouchableOpacity onPress={this.props.onPressCondition}>
              <ModelTabs title="Share" modalVisible={this.props.modalVisible} />
            </TouchableOpacity>
            <ModelTabs title="Follow" modalVisible={this.props.modalVisible} />
            <ModelTabs
              title="Save for later"
              modalVisible={this.props.modalVisible}
            />
            <ModelTabs title="Report" modalVisible={this.props.modalVisible} />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}
