import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import InputFormField from './components/InputFormField';

import axios from 'axios';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      number: '',
      name: '',
      password: '',
      loader: false,
    };
  }
  loginValidation = () => {
    if (
      this.state.email != '' &&
      this.state.number != '' &&
      this.state.name != '' &&
      this.state.password != ''
    ) {
      return true;
    } else return false;
  };

  onSubmit() {
    this.setState({loader: true});
    let axiosConfig = {
      headers: {
        Authorization: this.state.auth,
      },
    };
    let url = ' http://18.190.154.188:9000/endUsers/registerNewUser';

    var postData = {
      profilePic: {
        name: 'My pICTURE',
        url: 'https://xm-customer.s3.ap-south-1.amazonaws.com/images/16139913872243qF9NbThu.jpg',
      },
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.number,
      password: this.state.password,
      gender: 'Male',
      dob: '1994-08-28',
      address: {
        firstName: 'Balavan',
        lastName: 'Patil',
        mobile: '8197830443',
        line1: 'Patil Nivas',
        line2: 'Basavkalyan',
        landmark: 'Basavkalyan',
        houseNumber: '26/7',
        street: 'Talhbhog',
        city: 'Basavkalyan',
        pinCode: 585327,
        state: 'Karnataka',
        country: 'INDIA',
      },
    };
    axios
      .post(url, postData, axiosConfig)
      .then(res => {
        // this.setState({ allInfluencer: res.data.Data });

        if (res.status == 201) {
          this.props.navigation.navigate('HomeScreen');
        }
        this.setState({loader: false});
      })
      .catch(err => {
        if (err.response.data.message != null) {
          alert(err.response.data.message);
        }
        this.setState({loader: false});
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView
          style={{
            marginTop: StatusBar.currentHeight,
            justifyContent: 'center',
            marginHorizontal: 30,
            alignItems: 'center',
          }}>
          <Text style={styles.primaryLTextBold}>Sign Up</Text>

          <Image
            source={require('../../assets/images/dummy.png')}
            style={{width: 190, height: 200}}
          />
        </SafeAreaView>
        <View style={{marginHorizontal: 30}}>
          <InputFormField
            label="Email"
            placeholder="Enter your Email"
            onChangeText={text =>
              this.setState({
                email: text,
              })
            }
          />
          <InputFormField
            label="Contact Number"
            placeholder="Enter your Number"
            onChangeText={text =>
              this.setState({
                number: text,
              })
            }
          />
          <InputFormField
            label="Your name"
            placeholder="Enter your name"
            onChangeText={text =>
              this.setState({
                name: text,
              })
            }
          />
          <InputFormField
            label="Password"
            placeholder="Enter your password"
            setState={this.setState}
            secureTextEntry={true}
            onChangeText={text =>
              this.setState({
                password: text,
              })
            }
          />

          <View style={{alignItems: 'center', paddingVertical: 10}}>
            <Text style={styles.primaryMText}>Sign-up with</Text>
          </View>

          <TouchableOpacity style={styles.btnLoginWith}>
            <Text
              style={{
                ...styles.primaryMTextBold,
                fontSize: 16,
                color: '#015DD3',
                marginRight: 10,
              }}>
              Google
            </Text>
            <Image
              source={require('../../assets/icons/google.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 20,
            }}>
            <Text style={{...styles.secondaryMText}}>Already a member?</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}>
              <Text
                style={{
                  ...styles.primaryMTextBold,
                  color: '#015DD3',
                  marginLeft: 10,
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.onSubmit();
            }}
            disabled={!this.loginValidation()}
            style={{
              ...styles.submitBtnWrapper,
              paddingVertical: 10,
              marginBottom: 40,
              opacity: !this.loginValidation() && 0.5,
            }}>
            {this.state.loader ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text
                style={{
                  ...styles.primaryMTextBold,
                  color: 'white',
                  textAlign: 'center',
                }}>
                Submit
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
