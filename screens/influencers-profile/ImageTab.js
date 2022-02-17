import React, { Component } from "react";
import { Image, Modal, TouchableOpacity, View } from "react-native";
import data from "../../constants/data";
import styles from "./styles";

import MasonryList from "react-native-masonry-list";

export default class ImageTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedImg: "",
      width: null,
      height: null,
    };
  }
  render() {
    return (
      <>
        <MasonryList
          images={data}
          columns={2}
          spacing={3}
          imageContainerStyle={{ borderRadius: 10 }}
          onLongPressImage={(item) => {
            this.setState({ selectedImg: item.uri });
            this.setState({ width: item.masonryDimensions.width });
            this.setState({ height: item.masonryDimensions.height });
            this.setState({ visible: true });
          }}
        />
        <Modal
          transparent={true}
          onRequestClose={() => {
            this.setState({ visible: false });
          }}
          animationType={"fade"}
          visible={this.state.visible}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({ visible: false });
            }}
            activeOpacity={1}
            style={styles.containerModel}
          >
            <View style={styles.modal}>
              <Image
                source={{ uri: this.state.selectedImg }}
                style={{
                  width: this.state.width * 1.5,
                  height: this.state.height * 1.5,
                  borderRadius: 10,
                }}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    );
  }
}
