import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import colors from '../../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const width = Dimensions.get('window').width;

export default class ConfirmBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      user_id: this.props.route.params.user_id,
      influencer_id: this.props.route.params.influencer_id,
      payment: this.props.route.params.payment,
      influencerDetails: [],
      profile_image: '',
      coords: [],
    };
  }

  componentDidMount() {
    this.getInfluencerDetails();
  }

  async getInfluencerDetails() {
    let axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWJlZTJjMzg3Nzg1ZjA5NzljY2ZiY2EiLCJlbWFpbCI6InRhbWFuQDEyMy5nbWFpbC5jb20iLCJtb2JpbGUiOiI3MDA3MzMyNzI3IiwiaWF0IjoxNjQxNjI0OTc0LCJleHAiOjE2NDQyMTY5NzR9.7DYVd6nVLLpi1-nGsOwE7pudxfkcTN1gHZTFarMQdAQ',
      },
    };
    let url =
      'http://18.190.154.188:9000/inflncr/getInfluencerDetails/' +
      this.state.influencer_id;

    axios
      .get(url, axiosConfig)
      .then(async res => {
        this.setState({influencerDetails: res.data.Data});
        this.setState({profile_image: res.data.Data.profile_image.url});
        this.setState({coords: res.data.Data.location.coordinates});

        this.setState({loader: false});
      })
      .catch(err => {});
  }

  render() {
    if (this.state.loader) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={'black'} />
        </View>
      );
    }
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
            Confirm & pay
          </Text>
        </SafeAreaView>

        <Text
          style={{
            ...styles.primaryMTextBold,
            color: '#9aa1ab',
            margin: 30,
            marginBottom: 10,
            fontSize: 16,
          }}>
          TIME SLOT
        </Text>
        <View
          style={{
            ...styles.row,
            justifyContent: 'space-between',
            backgroundColor: '#F2F7FD',
            paddingVertical: 10,
            paddingHorizontal: 30,
          }}>
          <Text style={styles.secondaryMText}>
            Date: {this.props.route.params.date}
          </Text>
          <Text style={styles.secondaryMText}>
            Time: {this.props.route.params.time}
          </Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </View>

        <View style={{margin: 30}}>
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
              source={{
                uri: this.state.profile_image,
              }}
              style={{
                width: 90,
                height: 90,
                borderRadius: 90 / 2,
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
          <View
            style={{
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: '#E6E8EC',
            }}>
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
            <Text
              style={{
                ...styles.primaryMText,
                color: '#FF9E00',
                textAlign: 'center',
                paddingVertical: 20,
              }}>
              Rate/hr {''} Rs {this.state.payment}
            </Text>
          </View>

          <View
            style={{
              ...styles.row,
              justifyContent: 'space-evenly',
              marginHorizontal: 50,
              paddingVertical: 20,
            }}>
            <Text style={{...styles.primaryLTextBold}}>Total</Text>
            <Text
              style={{...styles.primarySText, fontSize: 18, color: 'black'}}>
              Rs 1,000
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Success', {
                msg: 'Your Slot has been Booked!',
                navigateTo: 'ProfileScreen',
                slot:
                  'Please reach the store on ' +
                  this.props.route.params.date +
                  ' on ' +
                  this.props.route.params.time,
              });
            }}
            style={{paddingVertical: 10}}>
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
                Proceed to payment
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
