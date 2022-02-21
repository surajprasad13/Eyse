import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import InputFormField from '../onboarding/components/InputFormField';
import colors from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Geolocation from '@react-native-community/geolocation';

const width = Dimensions.get('window').width;

class SocialMediaLinks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          paddingVertical: 5,
        }}>
        {this.props.font ? (
          <FontAwesome5 name={this.props.icon} size={30} color="black" />
        ) : (
          <FontAwesome name={this.props.icon} size={30} color="black" />
        )}
        <TextInput
          style={{
            height: 40,
            width: width / 1.3,
            backgroundColor: '#F2F7FD',
            borderRadius: 5,
            padding: 10,
            ...styles.secondaryMText,
            color: '#677890',
          }}
          placeholder="Enter link"
          placeholderTextColor="#677890"
        />
      </View>
    );
  }
}

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onSelect}>
        <View
          style={{
            ...styles.row,
            paddingVertical: 10,
          }}>
          <View
            style={{
              backgroundColor: '#F2F7FD',
              borderColor: '#B3CEF2',
              borderWidth: 0.5,
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {this.props.selectedShifts.includes(this.props.id) && (
              <FontAwesome name="check" size={15} color="#373737" />
            )}
          </View>

          <Text
            style={{
              ...styles.secondarySText,
              color: '#677890',
              width: width / 2.5,
              marginLeft: 10,
            }}>
            {this.props.shift}
          </Text>
          <View style={{alignSelf: 'center', position: 'absolute', right: 30}}>
            <Text
              style={{
                ...styles.secondarySText,
                color: '#677890',
              }}>
              {this.props.time}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class FillForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      address: '',
      expertise: '',
      experience: '',
      degree: '',
      study: '',
      dropdownData: ['Docter', 'Developer', 'IT person'],
      selectedShifts: [],
      rate: '',
      termsCheck: false,
      customModel: false,
      moreLinks: 0,
      loader: false,
      lat: '',
      long: '',
      status: '',
      customShift: false,
      customeStart: '',
      customeEnd: '',
      locationPermission: false,
    };
  }
  async componentDidMount() {
    this.getPermission();
  }
  async getPermission() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({lat: position.coords.latitude});
        this.setState({long: position.coords.longitude});
      },
      error => console.log('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }
  async onSelectInterest(id) {
    let selectedIn = this.state.selectedShifts;
    if (selectedIn.includes(id)) {
      selectedIn.splice(selectedIn.indexOf(id), 1);
    } else {
      selectedIn.push(id);
    }
    this.setState({selectedShifts: selectedIn});
  }

  addMoreLinks = num => {
    var i = 0;

    // console.log(i);
    for (i; i < num; i++) {
      console.log(i);
      return <SocialMediaLinks />;
    }
  };

  formValidation = () => {
    if (
      this.state.username != '' &&
      this.state.expertise != '' &&
      this.state.experience != '' &&
      this.state.degree != '' &&
      this.state.study != '' &&
      this.state.rate != '' &&
      this.state.selectedShifts.length != 0 &&
      this.state.termsCheck
    ) {
      return true;
    } else return false;
  };
  onSubmit = async () => {
    this.setState({loader: true});

    let user = await AsyncStorage.getItem('userData');
    let jsonUser = JSON.parse(user);

    if (user != null) {
      console.log(jsonUser.name);
    }

    axios
      .post('http://18.190.154.188:9000/inflncr/registerNewInfluencer', {
        name: jsonUser.name,
        email: jsonUser.email,
        password: '123',
        mobile: jsonUser.mobile,
        category_id: this.state.expertise,
        description: 'I am a Hardware Influenser',
        latitude: this.state.lat,
        longitude: this.state.long,
        if_expert: true,
        years_Active: this.state.experience,
        expert_charge: '95000',
        rate_per_hour: this.state.rate,
        instagram_link: {
          name: 'BERG-SAL-6622_1.jpg',
          url: 'https://xm-customer.s3.ap-south-1.amazonaws.com/images/1613125794496ZLRgljPBq.jpg',
        },
        facebook_link: {
          name: 'BERG-SAL-6622_1.jpg',
          url: 'https://xm-customer.s3.ap-south-1.amazonaws.com/images/1613125794496ZLRgljPBq.jpg',
        },
        twitter_link: {
          name: 'BERG-SAL-6622_1.jpg',
          url: 'https://xm-customer.s3.ap-south-1.amazonaws.com/images/1613125794496ZLRgljPBq.jpg',
        },
      })
      .then(response => {
        if (response.status == 201) {
          console.log(response);
          this.props.navigation.navigate('ProfileTabNavigator');
        }
      })
      .catch(async function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          alert(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request, 'request error');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      });
  };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <SafeAreaView style={{...styles.headerWrapper}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={require('../../assets/icons/back.png')}
              style={{
                height: 24,
                width: 24,
              }}
            />
          </TouchableOpacity>
          <Text style={{...styles.primaryLTextBold, margin: 10}}>
            Fill the form
          </Text>
        </SafeAreaView>

        <View style={{marginHorizontal: 30, marginBottom: 50}}>
          <InputFormField
            placeholder="Type a username"
            onChangeText={text => {
              this.setState({username: text});
            }}
          />

          <InputFormField
            onSelect={(index, value) => {
              this.setState({expertise: value});
            }}
            dropdown={true}
            dropdownData={this.state.dropdownData}
            placeholder="Category of expertise"
          />

          <InputFormField
            keyboardType="number-pad"
            onChangeText={text => {
              this.setState({experience: text});
            }}
            placeholder="Enter years of experience"
          />
          <InputFormField
            onSelect={(index, value) => {
              this.setState({degree: value});
            }}
            dropdown={true}
            dropdownData={this.state.dropdownData}
            placeholder="Highest degree of qualification"
          />
          <View style={{paddingVertical: 20}}>
            <Text style={{...styles.secondarySText}}>
              Choose shifts you’ll be available
            </Text>
            <Checkbox
              id={1}
              shift="Morning:"
              time="07:00 AM - 11:00 AM"
              selectedShifts={this.state.selectedShifts}
              onSelect={() => {
                this.onSelectInterest(1);
              }}
            />
            <Checkbox
              id={2}
              shift="Afternoon:"
              time="12:00 PM - 04:00 PM"
              selectedShifts={this.state.selectedShifts}
              onSelect={() => {
                this.onSelectInterest(2);
              }}
            />
            <Checkbox
              id={3}
              shift="Evening:"
              time="04:00 PM - 08:00 PM"
              selectedShifts={this.state.selectedShifts}
              onSelect={() => {
                this.onSelectInterest(3);
              }}
            />
            <Checkbox
              id={4}
              shift="Night:"
              time="08:00 PM - 12:00 PM"
              selectedShifts={this.state.selectedShifts}
              onSelect={() => {
                this.onSelectInterest(4);
              }}
            />
            {this.state.customShift && (
              <Checkbox
                id={5}
                shift="Custom:"
                time={this.state.customeStart + ' - ' + this.state.customeEnd}
                selectedShifts={this.state.selectedShifts}
                onSelect={() => {
                  this.onSelectInterest(5);
                }}
              />
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              this.setState({customModel: true});
            }}
            style={{
              backgroundColor: '#F2F7FD',
              borderRadius: 5,
              padding: 10,
              elevation: 2,
              justifyContent: 'center',
              alignItems: 'center',
              width: 100,
              height: 40,
              alignSelf: 'center',
            }}>
            <Text style={{...styles.secondarySText}}>Custom</Text>
          </TouchableOpacity>

          <Modal
            transparent={true}
            onRequestClose={() => {
              this.setState({customModel: false});
            }}
            animationType={'fade'}
            visible={this.state.customModel}>
            <View style={styles.containerModel}>
              <View style={styles.modal}>
                <Text
                  style={{
                    ...styles.primaryLTextBold,
                    color: colors.primaryBackground,
                  }}>
                  Enter custom shifts
                </Text>
                <View>
                  <InputFormField
                    label="Enter start time"
                    placeholder="Start time"
                    keyboardType={'number-pad'}
                    onChangeText={text => {
                      this.setState({customeStart: text});
                    }}
                  />
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.primaryBackground,
                        padding: 5,
                        marginHorizontal: 5,
                      }}>
                      <Text>AM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.primaryBackground,
                        padding: 5,
                        marginHorizontal: 5,
                      }}>
                      <Text>PM</Text>
                    </TouchableOpacity>
                  </View>
                  <InputFormField
                    label="Enter end time"
                    placeholder="End time"
                    keyboardType={'number-pad'}
                    onChangeText={text => {
                      this.setState({customeEnd: text});
                    }}
                  />
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.primaryBackground,
                        padding: 5,
                        marginHorizontal: 5,
                      }}>
                      <Text>AM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.primaryBackground,
                        padding: 5,
                        marginHorizontal: 5,
                      }}>
                      <Text>PM</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({customShift: true});
                    this.setState({customModel: false});
                  }}
                  style={{
                    ...styles.submitBtnWrapper,
                    width: width / 2,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      ...styles.primaryMTextBold,
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <InputFormField
            keyboardType="number-pad"
            placeholder="Rate per hour"
            onChangeText={text => {
              this.setState({rate: text});
            }}
          />

          <View style={{alignItems: 'flex-end', paddingVertical: 5}}>
            <Text
              style={{
                ...styles.secondarySText,
                textDecorationLine: 'underline',
              }}>
              How to calculate rate/hr
            </Text>
          </View>

          <View style={{paddingVertical: 20}}>
            <Text style={{...styles.primaryMTextBold}}>
              Your social media links
            </Text>

            <SocialMediaLinks icon="twitter-square" />
            <SocialMediaLinks icon="facebook-square" />
            <SocialMediaLinks icon="instagram-square" font={true} />
            <SocialMediaLinks icon="linkedin-square" />

            {this.state.moreLinks != 0 &&
              this.addMoreLinks(this.state.moreLinks)}
            <TouchableOpacity
              disabled={this.state.moreLinks !== 0 && true}
              onPress={() => {
                this.setState({moreLinks: this.state.moreLinks + 1});
              }}
              style={{
                backgroundColor: '#F2F7FD',
                borderRadius: 5,
                padding: 5,
                elevation: 2,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: 20,
                opacity: this.state.moreLinks !== 0 && 0.5,
              }}>
              <Text style={{...styles.secondarySText}}>Add more links</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.setState({termsCheck: !this.state.termsCheck});
            }}
            style={{
              ...styles.row,
              paddingVertical: 10,
            }}>
            <View
              style={{
                backgroundColor: '#F2F7FD',
                borderColor: '#B3CEF2',
                borderWidth: 0.5,
                width: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
              }}>
              {this.state.termsCheck && (
                <FontAwesome name="check" size={15} color="#373737" />
              )}
            </View>

            <Text
              style={{
                ...styles.secondarySText,
                color: '#677890',
              }}>
              I hereby agree to all{' '}
              <Text style={{color: '#015DD3', textDecorationLine: 'underline'}}>
                {' '}
                terms and conditions
              </Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            // disabled={!this.formValidation()}
            onPress={() => {
              this.onSubmit();
              // this.props.navigation.navigate("Success", {
              //   msg: "Your details have been recorded",
              //   navigateTo: "ProfileTabNavigator",
              //   slot: "Our executive will reach out to you in a few days",
              // });
            }}
            style={{
              ...styles.submitBtnWrapper,
              paddingVertical: 10,
              marginBottom: 40,
              // opacity: !this.formValidation() && 0.5,
            }}>
            <Text
              style={{
                ...styles.primaryMTextBold,
                color: 'white',
                textAlign: 'center',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
