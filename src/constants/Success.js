import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import colors from './colors';
import styles from '../screens/onboarding/styles';

export default class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: props.route.params,
    };
  }

  render() {
    setTimeout(() => {
      this.props.navigation.navigate(this.props.route.params.navigateTo);
    }, 2000);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primaryBackground,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/icons/success.png')}
          style={{width: 130, height: 130}}
        />
        <Text
          style={{
            ...styles.primaryLTextBold,
            color: 'white',
            paddingVertical: 35,
          }}>
          {this.state.message.msg}
        </Text>
        <Text
          style={{
            ...styles.secondarySText,
            color: 'white',
            paddingVertical: 10,
            textAlign: 'center',
            marginHorizontal: 30,
          }}>
          {this.props.route.params.slot}
        </Text>
      </View>
    );
  }
}
