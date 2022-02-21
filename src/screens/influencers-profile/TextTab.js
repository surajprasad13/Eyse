import React, {Component} from 'react';
import {Text, View, Dimensions, ScrollView} from 'react-native';
import styles from './styles';
const width = Dimensions.get('window').width;

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

class TextPost extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View
          style={{
            backgroundColor: '#F2F7FD',
            borderRadius: 10,
            elevation: 2,
            marginHorizontal: 15,
            padding: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...styles.secondaryMText,
                color: '#011E46',
                width: width / 1.5,
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              molestie, ante id tincidunt dapibus...
            </Text>
            <Entypo name="dots-three-vertical" size={20} color="#99A5B5" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 10,
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
            elevation: 2,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
            right: 30,
            top: -30,
          }}>
          <MaterialCommunityIcons name="pin-outline" size={32} color="black" />
        </View>
      </View>
    );
  }
}

export default class TextTab extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextPost />
        <TextPost />
        <TextPost />
        <TextPost />
        <TextPost />
      </View>
    );
  }
}
