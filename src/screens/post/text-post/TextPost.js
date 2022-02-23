import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles';
import InputFormField from '../../onboarding/components/InputFormField';
import {UserPost} from '../../../axios';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class TextPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      loading: false,
      token: null,
    };
  }
  async componentDidMount() {
    const user = JSON.parse(await AsyncStorage.getItem('userToken'));
    if (user != null) {
      this.setState({token: user});
    }
  }
  onSubmit = () => {
    this.setState({loading: true});

    axios
      .post(
        'http://18.190.154.188:9000/inflncr/addInfluencerPosts',

        {
          type: 'TEXT',
          description: this.state.description,
        },
        {
          headers: {
            Authorization: this.state.token,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        if (response.status == 200) {
          this.props.navigation.navigate('HomeTabNavigator');
          this.setState({loading: false});
        }
      })
      .catch(error => {});
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={{...styles.headerWrapper}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={require('../../../assets/icons/back.png')}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
          <Text style={{...styles.primaryLTextBold, marginLeft: 10}}>
            Create a new post
          </Text>
        </SafeAreaView>

        <View style={{flex: 1, margin: 30}}>
          <View style={{...styles.row, justifyContent: 'space-between'}}>
            <Text style={{...styles.primaryMTextBold}}>
              Write a thought or a tip
            </Text>
          </View>

          <TextInput
            style={{
              height: height / 2,
              backgroundColor: '#F2F7FD',
              borderRadius: 5,
              padding: 10,
              fontSize: 16,
              marginVertical: 10,
              textAlignVertical: 'top',
              ...styles.secondarySText,
            }}
            onChangeText={text => {
              this.setState({description: text});
            }}
            multiline={true}
            placeholder="Write something..."
          />

          <Text style={{...styles.primaryMTextBold, marginVertical: 10}}>
            Tags
          </Text>
          <InputFormField placeholder="Enter hashtags here" />

          <TouchableOpacity
            disabled={this.state.loading ? true : false}
            onPress={() => {
              this.onSubmit();
            }}
            style={{
              ...styles.submitBtnWrapper,
              paddingVertical: 10,
              marginVertical: 30,
              opacity: this.state.loading && 0.5,
            }}>
            {this.state.loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text
                style={{
                  ...styles.primaryMTextBold,
                  color: 'white',
                  textAlign: 'center',
                }}>
                Publish
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
