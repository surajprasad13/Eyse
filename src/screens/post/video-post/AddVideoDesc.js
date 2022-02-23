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
import {launchImageLibrary} from 'react-native-image-picker';

import InputFormField from '../../onboarding/components/InputFormField';
import colors from '../../../constants/colors';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {UserPost} from '../../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const height = Dimensions.get('window').height;

export default class AddVideoDesc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVideo: this.props.route.params.selectedVideo,
      coverImage: '',
      desc: '',
      tags: '',
      tagList: this.props.route.params.tagList,
      loading: false,
      token: null,
      url: '',
    };
  }
  async componentDidMount() {
    const user = JSON.parse(await AsyncStorage.getItem('userToken'));
    if (user != null) {
      this.setState({token: user});
    }

    UserPost.getHashtags()
      .then(res => {})
      .catch(error => {});
  }
  publishValidation = () => {
    if (this.state.desc != '' && this.state.tags != '') {
      return true;
    } else return false;
  };
  onSubmit = () => {
    this.setState({loading: true});
    let uri = this.state.selectedVideo.toString();
    let filename = uri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formdata = new FormData();
    formdata.append('content', {
      uri: uri,
      name: filename,
      type: type,
    });

    UserPost.uploadFile(formdata)
      .then(res => {
        this.setState({url: res.data.url});

        axios
          .post(
            'http://18.190.154.188:9000/inflncr/addInfluencerPosts',

            {
              type: 'VIDEO',
              description:
                'https://featureventures-storage.s3.us-east-2.amazonaws.com/images/1635358998782gLYYZnSeA.mp4',
              caption: this.state.desc,
              hashtags: ['ggfddf', 'gffgfdg', 'gfdgfd', 'gdfgfd'],
              data: [
                {
                  name: 'BERG-SAL-6622_1.jpg',
                  url: this.state.url,
                },
              ],
              products: [
                {
                  name: 'sun glasses',
                  brand_name: 'Raybon',
                  color: 'Red',
                  size: 'XXL',
                  category: 'Wearable',
                  sub_category: 'Glasses',
                },
                {
                  name: 'T- shirt',
                  brand_name: 'Raybon',
                  color: 'Red',
                  size: 'XXL',
                  category: 'Clothings',
                  sub_category: 'T-shirt',
                },
              ],
            },
            {
              headers: {
                Authorization: this.state.token,
                'Content-Type': 'application/json',
              },
            },
          )
          .then(async response => {
            if (response.status == 200) {
              this.props.navigation.navigate('ProfileTabNavigator');
            }
          })
          .catch(function (error) {});
      })
      .catch(error => {});
  };
  render() {
    let openImagePickerAsync = async () => {
      launchImageLibrary({includeBase64: true}, response => {
        if (response.assets) {
          this.setState({coverImage: response.assets[0].uri});
        }
      });
    };
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
            <Text style={{...styles.primaryMTextBold}}>Add description</Text>
            <Text style={{...styles.primaryMTextBold}}>3/3</Text>
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
            multiline={true}
            onChangeText={text => {
              this.setState({desc: text});
            }}
            placeholder="Write something..."
          />

          <Text style={{...styles.primaryMTextBold, marginVertical: 10}}>
            Tags
          </Text>
          <InputFormField
            onChangeText={text => {
              this.setState({tags: text});
            }}
            placeholder="Enter hashtags here"
          />

          <View style={{paddingVertical: 10}}>
            <Text style={{...styles.primaryMTextBold, marginVertical: 10}}>
              Add cover image
            </Text>

            <View style={{...styles.row}}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={{
                    uri:
                      this.state.coverImage == ''
                        ? this.state.selectedVideo
                        : this.state.coverImage,
                  }}
                  style={{width: 130, height: 130}}
                />
                <Text
                  style={{
                    ...styles.secondarySText,
                    color: colors.primaryBackground,
                  }}>
                  Use default
                </Text>
              </View>
              <TouchableOpacity
                onPress={openImagePickerAsync}
                style={{alignItems: 'center', marginLeft: 20}}>
                <View
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 10,
                    backgroundColor: '#F2F7FD',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign
                    name="plus"
                    size={35}
                    color={colors.primaryBackground}
                  />
                </View>
                <Text
                  style={{
                    ...styles.secondarySText,
                  }}>
                  Add from gallery
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
