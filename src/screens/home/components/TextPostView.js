import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import styles from '../styles';

const width = Dimensions.get('window').width;

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class TextPostView extends React.Component {
  constructor(props) {
    super(props);
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
              <Text style={{...styles.primaryMTextBold}}>Influencers Name</Text>
              <Text style={{...styles.secondarySText}}>Follow</Text>
            </View>
          </View>
          <View style={{...styles.row}}>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/icons/share.png')}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="dots-three-vertical" size={20} color="#99A5B5" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#F2F7FD',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <Text style={{...styles.secondarySText, width: width / 1.5}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            molestie, ante id tincidunt dapibus...
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
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
          <MaterialCommunityIcons name="pin-outline" size={32} color="black" />
        </View>
      </View>
    );
  }
}
