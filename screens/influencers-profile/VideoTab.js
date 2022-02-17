import React, {Component} from 'react';
import {Dimensions, Modal, TouchableOpacity, View} from 'react-native';
import data from '../../constants/data';
import MasonryList from 'react-native-masonry-list';
import styles from './styles';
const width = Dimensions.get('window').width;
import Video from 'react-native-video';

export default class VideoTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <MasonryList
          images={data}
          columns={2}
          spacing={3}
          onLongPressImage={() => {
            this.setState({visible: true});
          }}
          imageContainerStyle={{borderRadius: 10}}
        />

        <Modal
          transparent={true}
          onRequestClose={() => {
            this.setState({visible: false});
          }}
          animationType={'fade'}
          visible={this.state.visible}>
          <TouchableOpacity
            onPress={() => {
              this.setState({visible: false});
            }}
            activeOpacity={1}
            style={styles.containerModel}>
            <View style={styles.modal}>
              <Video
                style={{
                  alignSelf: 'center',
                  width: width - 60,
                  height: 590,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'black',
                  borderRadius: 10,
                }}
                source={require('../../constants/reel2.mp4')}
                shouldPlay={this.state.visible}
                resizeMode="contain"
                isLooping
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}
