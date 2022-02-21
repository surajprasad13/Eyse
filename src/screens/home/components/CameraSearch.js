import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from '../styles';
import {launchImageLibrary} from 'react-native-image-picker';

export default class CameraSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: [],
      activeSlide: 0,
    };
  }

  render() {
    let openImagePickerAsync = async () => {
      launchImageLibrary({includeBase64: true}, response => {
        if (response.assets) {
          let selectedIn = this.state.selectedImage;
          selectedIn.push(response.assets[0].uri);
          this.setState({selectedImage: selectedIn});
        }
      });
    };

    return (
      <View
        style={{
          ...styles.container,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={openImagePickerAsync}
          style={{
            ...styles.submitBtnWrapper,
            padding: 10,
          }}>
          <Text
            style={{
              ...styles.primaryMTextBold,
              color: 'white',
              textAlign: 'center',
            }}>
            Take Photo
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
