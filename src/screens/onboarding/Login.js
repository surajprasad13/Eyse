import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// helpers
import {UserLogin} from '../../store/actions/authActions';
import InputFormField from './components/InputFormField';
import styles from './styles';

function Login({navigation}) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  // eslint-disable-next-line no-unused-vars
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
        .post('http://18.190.154.188:9000/users/login', {
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
            dispatch(UserLogin(response.data.data.token));
            dispatch(
              UserLogin(
                response.data.data.token,
                response.data.data._id,
                'user',
              ),
            );
            navigation.navigate('Interests');
          } else {
            alert('Invalid Credentials !!');
          }
        })
        .catch(function () {
          alert('Invalid Credentials !!');
          setLoader(false);
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
            dispatch(
              UserLogin(
                response.data.data.token,
                response.data.data._id,
                'influencer',
              ),
            );
            navigation.navigate('Interests');
            setLoader(false);
          } else {
            alert('Invalid Credentials !!');
          }
        })
        .catch(function (error) {
          alert('Invalid Credentials !!');
          setLoader(false);
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
