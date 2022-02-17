import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import styles from './styles';

import Entypo from 'react-native-vector-icons/Entypo';

const width = Dimensions.get('window').width;
import colors from '../../constants/colors';

export default class UserSideDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{...styles.headerWrapper, justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
          </View>
          <Entypo name="dots-three-vertical" size={24} color="black" />
        </SafeAreaView>

        <View
          style={{
            marginVertical: 30,
          }}>
          <View>
            <View style={{marginHorizontal: 30, marginVertical: 10}}></View>
            <View
              style={{
                backgroundColor: '#F2F7FD',
                ...styles.row,
                paddingHorizontal: 30,
                paddingVertical: 10,
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <Text
                style={{
                  ...styles.primaryMTextBold,
                  color: colors.primaryBackground,
                }}>
                Friday
              </Text>
              <Text style={{...styles.secondarySText}}>15th Aug</Text>
              <Text style={{...styles.secondarySText, color: '#677890'}}>
                07:00 AM - 08:00 AM
              </Text>
            </View>

            <View
              style={{
                marginHorizontal: 30,
              }}>
              <Text
                style={{
                  ...styles.primaryMTextBold,
                  color: '#9aa1ab',
                  fontSize: 16,
                }}>
                EXPERT
              </Text>
              <View style={{...styles.row, paddingVertical: 20}}>
                <Image
                  source={require('../../assets/images/profile_image.png')}
                  style={{
                    width: 90,
                    height: 90,
                  }}
                />
                <View
                  style={{
                    width: width / 2,
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      ...styles.primaryMTextBold,
                      color: '#011E46',
                      paddingVertical: 2,
                    }}>
                    Influencers Name
                  </Text>

                  <Text style={{...styles.secondaryMText, color: '#677890'}}>
                    Docter
                  </Text>
                </View>
              </View>

              <View style={{...styles.row}}>
                <Image
                  source={require('../../assets/icons/school_black.png')}
                  style={{width: 26.29, height: 24, marginRight: 10}}
                />
                <Text style={styles.primaryMTextBold}>
                  MD Opthamologist | MBBS KIMS
                </Text>
              </View>
              <View style={{...styles.row}}>
                <Image
                  source={require('../../assets/icons/location.png')}
                  style={{width: 26.29, height: 24, marginRight: 10}}
                />
                <Text style={styles.secondarySText}>
                  Bangalore • Exp: 20 years
                </Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          disabled={!this.props.route.params.join}
          style={{
            position: 'absolute',
            bottom: 20,
            width: width - 60,
            alignSelf: 'center',
            opacity: !this.props.route.params.join ? 0.5 : 1,
          }}>
          <View
            style={{
              ...styles.submitBtnWrapper,
              backgroundColor: colors.primaryBackground,
            }}>
            <Text
              style={{
                ...styles.primaryMTextBold,
                color: 'white',
                textAlign: 'center',
              }}>
              Join
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
