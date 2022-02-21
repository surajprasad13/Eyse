import React, {useState} from 'react';
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

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userType, setUserType] = useState('');

  const loginValidation = () => {
    if (username != '' && password != '') {
      return true;
    } else return false;
  };
  const onSubmit = type => {
    if (type == 'user') {
      setLoader(true);
      axios
        .post('https://18.190.154.188:9000/users/login', {
          email: username,
          password: password,
        })
        .then(async response => {
          if (response.status == 200) {
            await AsyncStorage.setItem(
              'userData',
              JSON.stringify(response.data.data),
            );
            await AsyncStorage.setItem(
              'userToken',
              JSON.stringify(response.data.data.token),
            );
            await AsyncStorage.setItem('userId', response.data.data._id);
            await AsyncStorage.setItem('userType', 'user');
            setLoader(false);
            navigation.navigate('Interests');
          } else {
            alert('Invalid Credentials !!');
          }
        })
        .catch(function (error) {
          alert('Invalid Credentials !!');
          setLoader(false);
          // console.log(error);
        });
    }
    if (type == 'influencer') {
      setLoader(true);
      axios
        .post('http://18.190.154.188:9000/inflncr/login', {
          userName: username,
          password: password,
        })
        .then(async response => {
          if (response.status == 200) {
            await AsyncStorage.setItem(
              'userData',
              JSON.stringify(response.data.data),
            );
            await AsyncStorage.setItem(
              'userToken',
              JSON.stringify(response.data.data.token),
            );
            await AsyncStorage.setItem('userId', response.data.data._id);
            await AsyncStorage.setItem('userType', 'influencer');

            navigation.navigate('Interests');
            setLoader(false);
          } else {
            alert('Invalid Credentials !!');
          }
        })
        .catch(function (error) {
          alert('Invalid Credentials !!');
          setLoader(false);
          console.log(error);
        });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="always">
      <SafeAreaView
        style={{
          marginTop: StatusBar.currentHeight,
          justifyContent: 'center',
          marginHorizontal: 30,
          alignItems: 'center',
        }}>
        <Text style={styles.primaryLTextBold}>Login</Text>

        <Image
          source={require('../../assets/images/dummy.png')}
          style={{width: 190, height: 200}}
        />
      </SafeAreaView>
      <View style={{marginHorizontal: 30}}>
        <InputFormField
          label="User name"
          placeholder="Enter your username"
          onChangeText={text => setUsername(text)}
        />
        <InputFormField
          label="Password"
          placeholder="Enter your password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />

        <View style={{alignItems: 'flex-end', paddingVertical: 10}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}>
            <Text style={styles.secondaryMText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', paddingVertical: 10}}>
          <Text style={styles.primaryMText}>Login with</Text>
        </View>

        <TouchableOpacity
          style={{
            ...styles.btnLoginWith,
          }}>
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
            style={{width: 25, height: 25}}
          />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 20,
          }}>
          <Text style={{...styles.secondaryMText}}>Not a member yet?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text
              style={{
                ...styles.primaryMTextBold,
                color: '#015DD3',
                marginLeft: 10,
              }}>
              Sign-Up
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          disabled={!loginValidation()}
          onPress={() => {
            setUserType('user');
            onSubmit('user');
          }}
          style={{
            ...styles.submitBtnWrapper,
            paddingVertical: 10,
            marginBottom: 10,
            opacity: !loginValidation() && 0.5,
          }}>
          {loader ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text
              style={{
                ...styles.primaryMTextBold,
                color: 'white',
                textAlign: 'center',
              }}>
              Log in as User
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!loginValidation()}
          onPress={() => {
            setUserType('influencer');
            onSubmit('influencer');
          }}
          style={{
            ...styles.submitBtnWrapper,
            paddingVertical: 10,
            marginBottom: 40,
            opacity: !loginValidation() && 0.5,
          }}>
          {loader ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text
              style={{
                ...styles.primaryMTextBold,
                color: 'white',
                textAlign: 'center',
              }}>
              Log in as Influencer
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Login;
