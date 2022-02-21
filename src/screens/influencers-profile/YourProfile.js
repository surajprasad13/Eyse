import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
  LogBox,
} from 'react-native';
import styles from './styles';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Video from 'react-native-video';
import MasonryList from 'react-native-masonry-list';
const width = Dimensions.get('window').width;
import colors from '../../constants/colors';

import {
  CollapsibleNavBarScrollView,
  CollapsibleNavBarState,
} from '@busfor/react-native-collapsible-navbar-scrollview';

import YourProfileDetails from './components/YourProfileDetails';
import {UserApi} from '../../axios';
import Loader from '../../constants/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class TabBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          backgroundColor: '#F2F7FD',
          marginHorizontal: 30,
          marginVertical: 20,
        }}>
        <TouchableOpacity
          style={{
            width: width / 3 - 20,
            height: 45,
            backgroundColor:
              this.props.selectedTab == 1 ? '#d7e8fc' : '#F2F7FD',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={this.props.onPressTab1}>
          <Image
            source={require('../../assets/icons/dashboard.png')}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: width / 3 - 20,
            height: 45,
            backgroundColor:
              this.props.selectedTab == 2 ? '#d7e8fc' : '#F2F7FD',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={this.props.onPressTab2}>
          <Image
            source={require('../../assets/icons/video_library.png')}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: width / 3 - 20,
            height: 45,
            backgroundColor:
              this.props.selectedTab == 3 ? '#d7e8fc' : '#F2F7FD',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={this.props.onPressTab3}>
          <Image
            source={require('../../assets/icons/history.png')}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default class YourProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 1,
      visible: false,
      selectedImg: '',
      width: null,
      height: null,
      name: '',
      userData: [],
      loader: true,
      imageData: [],
      videoData: [],
      textData: [],
      influencerDetails: [],
      profile_image: '',
      userId: null,
      auth: '',
      refreshing: false,
    };
  }

  async componentDidMount() {
    const user = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');
    if (user != null && userId != null) {
      this.setState({auth: user.toString()});
      this.setState({userId: userId});
    }

    this.getInfluencerDetails();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getInfluencerDetails();
      //Put your Data loading function here instead of my this.loadData()
    });
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

  async getImagePost() {
    UserApi.getUserImagePost(this.state.userId)
      .then(response => {
        let data = response.data.Data;
        data.forEach(element => {
          this.setState({imageData: element.data});
        });

        console.log(this.state.imageData);
        this.setState({loader: false});
      })
      .catch(function (error) {
        // alert(error);
        console.log(error.response);
      });
  }
  getTextPost() {
    let axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWJlZTJjMzg3Nzg1ZjA5NzljY2ZiY2EiLCJlbWFpbCI6InRhbWFuQDEyMy5nbWFpbC5jb20iLCJtb2JpbGUiOiI3MDA3MzMyNzI3IiwiaWF0IjoxNjQxNjI0OTc0LCJleHAiOjE2NDQyMTY5NzR9.7DYVd6nVLLpi1-nGsOwE7pudxfkcTN1gHZTFarMQdAQ',
      },
    };
    var url =
      'http://18.190.154.188:9000/inflncr/getInfluencerTextPosts/' +
      this.state.userId;

    axios
      .get(url, axiosConfig)
      .then(response => {
        let data = response.data.Data;

        let arr = this.state.textData;
        data.forEach(element => {
          // arr.push({ id: element._id });
          arr.push({id: element._id, desc: element.desc});
        });

        this.setState({textData: arr});

        console.log(this.state.textData);
      })
      .catch(function (error) {
        // alert(error);
        console.log(error.response);
      });
  }

  getVideoPost() {
    UserApi.getUserVideoPost(this.state.userId)
      .then(response => {
        let data = response.data.Data;
        data.forEach(element => {
          this.setState({videoData: element.data});
        });

        console.log(this.state.videoData);
      })
      .catch(function (error) {
        // alert(error);
        console.log(error.response);
      });
  }
  async getInfluencerDetails() {
    let user = await AsyncStorage.getItem('userData');
    let jsonUser = JSON.parse(user);

    UserApi.getUserDetails(jsonUser._id)
      .then(response => {
        console.log(response);
        if (response.data.Data.profile_image != undefined) {
          this.setState({
            profile_image: response.data.Data.profile_image.url,
          });
        }

        this.setState({influencerDetails: response.data.Data});

        this.getImagePost();
        this.getVideoPost();
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }

  renderTextPost = item => {
    return (
      <View>
        <View
          style={{
            backgroundColor: '#F2F7FD',
            borderRadius: 10,
            elevation: 2,
            marginHorizontal: 15,
            padding: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...styles.secondaryMText,
                color: '#011E46',
                width: width / 1.5,
              }}>
              {item.desc}
            </Text>
            <Entypo name="dots-three-vertical" size={20} color="#99A5B5" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 10,
            }}>
            <AntDesign name="pushpino" size={20} color="#677890" />
            <Text
              style={{
                ...styles.primarySText,
                color: '#677890',
                marginLeft: 5,
              }}>
              112
            </Text>
          </View>
        </View>

        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: 'white',
            elevation: 2,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
            right: 30,
            top: -30,
          }}>
          <MaterialCommunityIcons name="pin-outline" size={32} color="black" />
        </View>
      </View>
    );
  };

  render() {
    if (this.state.loader) {
      return <Loader />;
    }
    return (
      <>
        <CollapsibleNavBarScrollView
          style={{backgroundColor: 'white'}}
          headerMinHeight={80}
          headerMaxHeight={340}
          header={
            <View style={{backgroundColor: 'white'}}>
              <YourProfileDetails
                influencerDetails={this.state.influencerDetails}
                profile_image={this.state.profile_image}
                navigate={this.props.navigation.navigate}
              />

              <TabBar
                selectedTab={this.state.selectedTab}
                onPressTab1={() => {
                  this.setState({
                    selectedTab: 1,
                  });
                  this.getImagePost();
                }}
                onPressTab2={() => {
                  this.setState({selectedTab: 2});
                  this.getVideoPost();
                }}
                onPressTab3={() => {
                  this.setState({selectedTab: 3});
                  this.getTextPost();
                }}
              />
            </View>
          }
          useNativeDriver={true}
          initialState={CollapsibleNavBarState.open}
          onChangeState={state => {
            console.log(state);
          }}>
          {this.state.selectedTab == 1 && (
            <MasonryList
              images={this.state.imageData}
              columns={2}
              spacing={4}
              imageContainerStyle={{borderRadius: 10}}
              onPressImage={item => {
                this.setState({selectedImg: item.url});
                this.setState({width: item.masonryDimensions.width});
                this.setState({height: item.masonryDimensions.height});
                this.setState({visible: true});
              }}
            />
          )}
          {this.state.selectedTab == 2 && (
            <MasonryList
              images={this.state.videoData}
              columns={2}
              spacing={3}
              onPressImage={() => {
                this.setState({visible: true});
              }}
              imageContainerStyle={{borderRadius: 10}}
            />
          )}
          {this.state.selectedTab == 3 && (
            <View style={{marginVertical: 20}}>
              {this.state.textData.map((item, key) => {
                return this.renderTextPost(item, key);
              })}
            </View>
          )}
          <Modal
            transparent={true}
            onRequestClose={() => {
              this.setState({visible: false});
            }}
            animationType={'fade'}
            visible={this.state.visible}>
            <TouchableOpacity
              onPress={() => {
                this.setState({visible: false});
              }}
              activeOpacity={1}
              style={styles.containerModel}>
              <View>
                {this.state.selectedTab == 2 ? (
                  <Video
                    paused={true}
                    style={{
                      alignSelf: 'center',
                      width: width - 60,
                      height: 590,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'black',
                      borderRadius: 10,
                    }}
                    source={require('../../constants/reel2.mp4')}
                    shouldPlay={this.state.visible}
                    resizeMode="contain"
                    isLooping
                  />
                ) : (
                  <Image
                    source={{uri: this.state.selectedImg}}
                    style={{
                      width: this.state.width * 2,
                      height: this.state.height * 2,
                      borderRadius: 10,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          </Modal>
        </CollapsibleNavBarScrollView>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('PostType');
          }}
          style={{
            position: 'absolute',
            alignSelf: 'flex-end',
            right: 30,
            bottom: 30,
            backgroundColor: 'white',
            borderRadius: 25,
          }}>
          <AntDesign
            name="pluscircle"
            size={50}
            color={colors.primaryBackground}
          />
        </TouchableOpacity>
      </>
    );
  }
}
