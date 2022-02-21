import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
} from 'react-native';
import styles from './styles';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import InputFormField from '../onboarding/components/InputFormField';
import {launchImageLibrary} from 'react-native-image-picker';
import colors from '../../constants/colors';
const width = Dimensions.get('window').width;

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
            justifyContent: 'space-between',
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
            }}>
            {this.props.shift}
          </Text>
          <Text style={{...styles.secondarySText, color: '#677890'}}>
            {this.props.time}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

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

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: '',
      selectedShifts: [],
      customModel: false,
    };
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

  render() {
    let openImagePickerAsync = async () => {
      launchImageLibrary({includeBase64: true}, response => {
        if (response.assets) {
          let selectedIn = this.state.selectedImage;
          selectedIn.push(response.assets[0].uri);
          this.setState({selectedImage: selectedIn});
        }
      });
    };
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={{...styles.headerWrapper}}>
          <View style={{...styles.row}}>
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
              Edit Profile details
            </Text>
          </View>
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={24} color="black" />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={{margin: 30}}>
          <View style={{alignSelf: 'center'}}>
            <Image
              source={
                this.state.selectedImage == ''
                  ? require('../../assets/images/profile_image.png')
                  : {uri: this.state.selectedImage}
              }
              style={{width: 120, height: 120, borderRadius: 60}}
            />

            <TouchableOpacity
              onPress={openImagePickerAsync}
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#F2F7FD',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                alignSelf: 'flex-end',
              }}>
              <Image
                source={require('../../assets/icons/edit.png')}
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity>
          </View>

          <View>
            <InputFormField label="User Name *" placeholder="Enter user name" />
            <InputFormField
              label="Name *"
              placeholder="Influencers first name last name"
            />

            <InputFormField
              label="Designation *"
              dropdown={true}
              placeholder="Doctor"
            />
            <InputFormField label="Specilization *" placeholder="Doctor" />
            <InputFormField label="Highest degree *" placeholder="MBBS KIMS" />

            <InputFormField
              label="Location *"
              dropdown={true}
              placeholder="Bangalore, Karnataka, India"
            />
            <InputFormField
              label="Experience *"
              dropdown={true}
              placeholder="20 years"
            />
            <InputFormField multiline={true} label="Bio *" />

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

            <InputFormField label="Rate per hour *" placeholder="500" />
            <InputFormField
              toggle={true}
              label="Member’s price"
              placeholder="500"
            />
          </View>

          <View style={{paddingVertical: 20}}>
            <Text style={{...styles.primaryMTextBold}}>
              Your social media links
            </Text>

            <SocialMediaLinks icon="twitter-square" />
            <SocialMediaLinks icon="facebook-square" />
            <SocialMediaLinks icon="instagram-square" font={true} />
            <SocialMediaLinks icon="linkedin-square" />
          </View>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ProfileTabNavigator');
            }}
            style={{
              ...styles.submitBtnWrapper,
              paddingVertical: 10,
              marginBottom: 40,
            }}>
            <Text
              style={{
                ...styles.primaryMTextBold,
                color: 'white',
                textAlign: 'center',
              }}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
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
                />
                <InputFormField label="Enter end time" placeholder="End time" />
              </View>

              <TouchableOpacity
                onPress={() => {
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
      </ScrollView>
    );
  }
}
