import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import Video from 'react-native-video';
import styles from '../styles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class VideoPostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldPlay: false,
    };
  }

  render() {
    return (
      <View
        style={{
          borderRadius: 10,
          elevation: 4,
          marginHorizontal: 1,
          backgroundColor: 'white',
          marginVertical: 10,
        }}>
        <View
          style={{
            ...styles.row,
            justifyContent: 'space-between',
            padding: 15,
          }}>
          <View style={{...styles.row}}>
            <Image
              source={require('../../../assets/images/profile_image.png')}
              style={{
                width: 45,
                height: 45,
              }}
            />
            <View
              style={{
                marginLeft: 10,
              }}>
              <Text style={{...styles.primaryMTextBold}}>Store name</Text>
              <Text style={{...styles.secondarySText}}>Follow</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={20} color="#99A5B5" />
          </TouchableOpacity>
        </View>

        <View>
          <View style={{backgroundColor: 'black'}}>
            <Video
              style={{
                alignSelf: 'center',
                width: width - 2,
                height: width * 1.75,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={this.props.video}
              shouldPlay={this.state.shouldPlay}
              resizeMode="contain"
              isLooping
            />

            <TouchableOpacity
              onPress={() => {
                this.setState({shouldPlay: !this.state.shouldPlay});
              }}
              style={{
                width: 35,
                height: 35,
                borderRadius: 5,
                backgroundColor: '#e3e3e3',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                right: 10,
                top: 10,
              }}>
              {this.state.shouldPlay ? (
                <Entypo name="controller-paus" size={20} color="black" />
              ) : (
                <Entypo name="controller-play" size={20} color="black" />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: 'white',
              elevation: 5,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-end',
              right: 10,
              bottom: 30,
            }}>
            <MaterialCommunityIcons
              name="pin-outline"
              size={32}
              color="black"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginTop: -40,
          }}>
          <AntDesign name="pushpino" size={20} color="#677890" />
          <Text
            style={{
              ...styles.primarySText,
              color: '#677890',
              marginLeft: 5,
            }}>
            112
          </Text>
        </View>

        <View
          style={{
            ...styles.row,
            justifyContent: 'space-between',
            padding: 15,
          }}>
          <Text style={{...styles.secondarySText, width: width / 1.5}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            molestie, ante id tincidunt dapibus...
          </Text>
          <Image
            source={require('../../../assets/icons/share.png')}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </View>
      </View>
    );
  }
}
