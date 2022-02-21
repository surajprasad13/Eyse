import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';

export default class YourBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={{...styles.headerWrapper}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={require('../../assets/icons/back.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </TouchableOpacity>
          <Text style={{...styles.primaryLTextBold, marginLeft: 10}}>
            Your bookings
          </Text>
        </SafeAreaView>

        <View
          style={{
            marginVertical: 30,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({opened: !this.state.opened});
            }}
            style={{
              ...styles.row,
              paddingVertical: 15,
              paddingHorizontal: 30,
              elevation: 2,
              borderStyle: 'solid',
              justifyContent: 'space-between',
            }}>
            <View style={{...styles.row}}>
              <Text style={{...styles.primaryMTextBold}}>Friday </Text>
              <Text style={{...styles.primaryMTextBold}}>15th </Text>
            </View>
            <View style={{...styles.row}}>
              <Text style={{...styles.secondarySText, color: '#FF9E00'}}>
                2 calls{' '}
              </Text>
              {this.state.opened ? (
                <Entypo name="chevron-down" size={24} color="black" />
              ) : (
                <Entypo name="chevron-up" size={24} color="black" />
              )}
            </View>
          </TouchableOpacity>

          {this.state.opened && (
            <View>
              <View style={{marginHorizontal: 30, marginVertical: 10}}>
                <Text style={{...styles.secondaryMText}}>Morning</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('UserSideDetails', {
                    join: false,
                  });
                }}
                style={{
                  backgroundColor: '#F2F7FD',
                  ...styles.row,
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{...styles.primaryMTextBold}}>Influencer one</Text>
                <Text style={{...styles.secondarySText}}>
                  07:00 AM - 08:00 AM
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('UserSideDetails', {
                    join: true,
                  });
                }}
                style={{
                  backgroundColor: '#F2F7FD',
                  ...styles.row,
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{...styles.primaryMTextBold}}>
                  Influencer name
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('UserSideDetails', {
                      join: true,
                    });
                  }}
                  style={{
                    backgroundColor: colors.primaryBackground,
                    borderRadius: 13,
                    paddingHorizontal: 20,
                    paddingVertical: 2,
                  }}>
                  <Text
                    style={{
                      ...styles.primaryMTextBold,
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    Join
                  </Text>
                </TouchableOpacity>
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}
