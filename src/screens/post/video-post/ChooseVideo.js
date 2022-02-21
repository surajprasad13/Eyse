import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from '../styles';
// import * as ImagePicker from 'expo-image-picker';
import Video from 'react-native-video';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ChooseVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVideo: '',
      status: {},
      shouldPlay: false,
    };
  }
  render() {
    let openImagePickerAsync = async () => {
      // let permissionResult =
      //   await ImagePicker.requestMediaLibraryPermissionsAsync();
      // if (permissionResult.granted === false) {
      //   alert('Permission to access camera roll is required!');
      //   return;
      // }
      // let pickerResult = await ImagePicker.launchImageLibraryAsync({
      //   mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      //   allowsEditing: true,
      //   allowsMultipleSelection: true,
      //   aspect: [9, 16],
      // });
      // if (pickerResult.cancelled === true) {
      //   return;
      // }
      // this.setState({selectedVideo: pickerResult.uri});
    };
    return (
      <View style={styles.container}>
        <SafeAreaView style={{...styles.headerWrapper}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={require('../../../assets/icons/back.png')}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
          <Text style={{...styles.primaryLTextBold, marginLeft: 10}}>
            Create a new post
          </Text>
        </SafeAreaView>

        <View style={{flex: 1, margin: 30, justifyContent: 'space-between'}}>
          <View style={{...styles.row, justifyContent: 'space-between'}}>
            <Text style={{...styles.primaryMTextBold}}>Choose a video</Text>
            <Text style={{...styles.primaryMTextBold}}>1/3</Text>
          </View>
          {this.state.selectedVideo !== null && (
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({shouldPlay: !this.state.shouldPlay});
                }}
                style={{alignItems: 'center', width: width - 60}}>
                <Video
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
                  onPlaybackStatusUpdate={status =>
                    //this.setState({ status: status })
                    console.log(status)
                  }
                />
              </TouchableOpacity>
            </View>
          )}
          <View>
            <TouchableOpacity
              onPress={() => {
                this.setState({shouldPlay: false});
                this.state.selectedVideo == ''
                  ? openImagePickerAsync()
                  : this.props.navigation.navigate('TagVideoProducts', {
                      selectedVideo: this.state.selectedVideo,
                    });
              }}
              style={{
                ...styles.submitBtnWrapper,
                paddingVertical: 10,
                marginVertical: 10,
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
