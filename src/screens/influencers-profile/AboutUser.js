import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';
import colors from '../../constants/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;

export default class AboutUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      follow: false,
      profile_image: this.props.route.params.profile_image,
      influencerDetails: this.props.route.params.influencerDetails,
      userId: '',
    };
  }
  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');

    this.setState({userId: userId});
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
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={20} color="black" />
          </TouchableOpacity>
        </SafeAreaView>

        <View
          style={{
            marginHorizontal: 30,
          }}>
          <View style={{...styles.row, marginHorizontal: 20}}>
            <Image
              source={
                this.state.profile_image == ''
                  ? require('../../assets/images/dummy.png')
                  : {
                      uri: this.state.profile_image,
                    }
              }
              style={{
                borderRadius: 90 / 2,
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
                  fontSize: 16,
                }}>
                {this.state.influencerDetails.name}
              </Text>
              <Text style={{...styles.secondaryMText, color: '#677890'}}>
                Doctor
              </Text>
            </View>
          </View>

          <View style={{paddingVertical: 10}}>
            <View style={{...styles.row}}>
              <Image
                source={require('../../assets/icons/school_black.png')}
                style={{width: 26, height: 24}}
              />
              <Text
                style={{
                  ...styles.primaryMTextBold,
                  color: '#011E46',
                  marginLeft: 10,
                }}>
                MD Opthamologist | {this.state.influencerDetails.highest_degree}
              </Text>
            </View>
            <View style={{...styles.row}}>
              <Image
                source={require('../../assets/icons/location.png')}
                style={{width: 26, height: 24}}
              />
              <Text
                style={{
                  ...styles.primaryMText,
                  color: '#011E46',
                  marginLeft: 10,
                }}>
                Bangalore • Exp: {this.state.influencerDetails.years_Active}{' '}
                years
              </Text>
            </View>

            <View style={{paddingVertical: 20}}>
              <Text style={{...styles.secondaryMText, color: '#677890'}}>
                {this.state.influencerDetails.description}
              </Text>
            </View>

            <View
              style={{
                ...styles.row,
                justifyContent: 'space-between',
                width: width / 3,
              }}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    this.state.influencerDetails.twitter_link.url,
                  );
                }}>
                <FontAwesome name="twitter-square" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    this.state.influencerDetails.facebook_link.url,
                  );
                }}>
                <FontAwesome name="facebook-square" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    this.state.influencerDetails.instagram_link.url,
                  );
                }}>
                <FontAwesome5 name="instagram-square" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    this.state.influencerDetails.facebook_link.url,
                  );
                }}>
                <FontAwesome name="linkedin-square" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#F2F7FD',
            paddingHorizontal: 30,
            paddingVertical: 10,
            marginVertical: 20,
            ...styles.row,
            justifyContent: 'space-between',
          }}>
          <View>
            <View style={styles.row}>
              <Text
                style={{
                  ...styles.primaryMTextBold,
                  fontSize: 18,
                  color: '#011E46',
                }}>
                Rate/hr
              </Text>
              <Text
                style={{
                  ...styles.primaryMTextBold,
                  color: '#677890',
                  fontSize: 16,
                  marginLeft: 10,
                }}>
                ₹ {this.state.influencerDetails.rate_per_hour}
              </Text>
            </View>
            <Text style={{...styles.secondaryMText}}>₹500 for members</Text>
          </View>

          <View
            style={{
              ...styles.row,
              backgroundColor: 'white',
              elevation: 2,
              borderRadius: 23,
              padding: 10,
            }}>
            <Text style={{...styles.secondaryMText, color: '#011E46'}}>
              Become member
            </Text>
            <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Book', {
              user_id: this.state.userId,
              influencer_id: this.state.influencerDetails._id,
              payment: this.state.influencerDetails.expert_charge,
            });
          }}
          style={{marginHorizontal: 30, marginBottom: 30}}>
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
              Book appointment
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
