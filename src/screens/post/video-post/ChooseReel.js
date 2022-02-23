import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from '../styles';
import Video from 'react-native-video';
import {launchImageLibrary} from 'react-native-image-picker';

import Ionicons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ChooseReel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVideo: '',
      status: {},
      shouldPlay: false,
      seconds: 15,
    };
  }
  render() {
    let openImagePickerAsync = async () => {
      launchImageLibrary({mediaType: 'video', selectionLimit: 0}, response => {
        if (response.assets) {
          this.setState({selectedVideo: response.assets[0].uri});
        }
      });
    };
    return (
      <View style={{...styles.container, backgroundColor: '#011E46'}}>
        <SafeAreaView style={{...styles.headerWrapper}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('PostType');
            }}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              ...styles.primaryLTextBold,
              marginLeft: 10,
              color: 'white',
            }}>
            Create a new post
          </Text>
        </SafeAreaView>

        <View style={{flex: 1, margin: 30, justifyContent: 'space-between'}}>
          <View style={{...styles.row, justifyContent: 'space-between'}}>
            <Text style={{...styles.primaryMTextBold, color: '#99A5B5'}}>
              Choose a reel video
            </Text>
            <Text style={{...styles.primaryMTextBold, color: '#99A5B5'}}>
              1/3
            </Text>
          </View>
          {this.state.selectedVideo != '' && (
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({shouldPlay: !this.state.shouldPlay});
                }}
                style={{alignItems: 'center', width: width - 60}}>
                <Video
                  paused={true}
                  style={{
                    alignSelf: 'center',
                    width: width - 60,
                    height: height / 1.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={{
                    uri: this.state.selectedVideo,
                  }}
                  shouldPlay={this.state.shouldPlay}
                  resizeMode="contain"
                  isLooping
                />
              </TouchableOpacity>
            </View>
          )}
          <View>
            <View style={{...styles.row, justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({seconds: 15});
                }}
                style={{
                  paddingVertical: 10,
                  marginVertical: 10,
                  backgroundColor:
                    this.state.seconds == 15 ? 'white' : '#011E46',
                  borderColor: '#99A5B5',
                  borderWidth: 0.2,
                  borderRadius: 5,
                  width: width / 2 - 40,
                }}>
                <Text
                  style={{
                    ...styles.primaryMTextBold,
                    color: this.state.seconds == 15 ? 'black' : 'white',
                    textAlign: 'center',
                  }}>
                  15 Seconds
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({seconds: 30});
                }}
                style={{
                  paddingVertical: 10,
                  marginVertical: 10,
                  backgroundColor:
                    this.state.seconds == 30 ? 'white' : '#011E46',
                  borderColor: '#99A5B5',
                  borderWidth: 0.2,
                  borderRadius: 5,
                  width: width / 2 - 40,
                }}>
                <Text
                  style={{
                    ...styles.primaryMTextBold,
                    color: this.state.seconds == 30 ? 'black' : 'white',
                    textAlign: 'center',
                  }}>
                  30 Seconds
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({shouldPlay: false});
                this.state.selectedVideo == ''
                  ? openImagePickerAsync()
                  : this.props.navigation.navigate('TagReelProducts', {
                      selectedVideo: this.state.selectedVideo,
                    });
              }}
              style={{
                ...styles.submitBtnWrapper,
                paddingVertical: 10,
                marginVertical: 10,
                backgroundColor: '#011E46',
                borderColor: '#99A5B5',
                borderWidth: 0.2,
              }}>
              <Text
                style={{
                  ...styles.primaryMTextBold,
                  color: 'white',
                  textAlign: 'center',
                }}>
                {this.state.selectedVideo == '' ? 'Choose video' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
