import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Share,
} from 'react-native';
import styles from '../styles';

const width = Dimensions.get('window').width;

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class ImagePostView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
            'This is message demo and this is url demo: http://kb-codes.github.io/',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };
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
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ProfileScreen', {
                  id: this.props.id,
                });
              }}
              style={{
                marginLeft: 10,
              }}>
              <Text style={{...styles.primaryMTextBold}}>
                {this.props.name}
              </Text>
              <Text style={{...styles.secondarySText}}>Follow</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={20} color="#99A5B5" />
          </TouchableOpacity>
        </View>

        <View>
          <Image
            source={{
              uri: 'https://source.unsplash.com/random/544',
            }}
            style={{
              width: width - 2,
              height: 220,
            }}
          />
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
            style={{...styles.primarySText, color: '#677890', marginLeft: 5}}>
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
          <TouchableOpacity onPress={onShare}>
            <Image
              source={require('../../../assets/icons/share.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
