import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import styles from '../styles';

import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../../constants/colors';

const width = Dimensions.get('window').width;

export default class VideoType extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          padding: 30,
          backgroundColor: 'white',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <TextInput
          style={{
            backgroundColor: '#F2F7FD',
            elevation: 1,
            borderRadius: 10,
            paddingVertical: 10,
            width: width - 80,
            ...styles.secondarySText,
            color: '#677890',
            textAlign: 'center',
          }}
          placeholder="Share video link"
          placeholderTextColor="#677890"
        />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ChooseVideo');
          }}
          style={{
            ...styles.row,
            backgroundColor: 'white',
            elevation: 1,
            borderRadius: 10,
            paddingVertical: 10,
            width: width - 80,
            marginTop: 30,
            justifyContent: 'center',
          }}>
          <Entypo name="upload" size={24} color={colors.primaryBackground} />
          <Text
            style={{
              ...styles.primaryMText,
              color: colors.primaryBackground,
              marginLeft: 10,
            }}>
            Upload video
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ChooseReel');
          }}
          style={{
            ...styles.row,
            justifyContent: 'space-between',
            backgroundColor: colors.primaryBackground,
            elevation: 1,
            borderRadius: 10,
            paddingVertical: 10,
            width: width - 80,
            marginTop: 30,
          }}>
          <Entypo name="folder-video" size={24} color="white" />
          <Text
            style={{
              ...styles.primaryMText,
              color: 'white',
              marginLeft: 10,
            }}>
            Upload Reel
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
