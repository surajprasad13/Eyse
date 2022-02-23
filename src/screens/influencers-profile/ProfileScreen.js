import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  LogBox,
  Dimensions,
  FlatList,
  Share,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';
import Video from 'react-native-video';
import MasonryList from 'react-native-masonry-list';
import data from '../../constants/data';
const width = Dimensions.get('window').width;

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  CollapsibleNavBarScrollView,
  CollapsibleNavBarState,
} from '@busfor/react-native-collapsible-navbar-scrollview';
import colors from '../../constants/colors';
import ProfileData from '../../constants/ProfileData';
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

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 1,
      visible: false,
      selectedImg: '',
      width: null,
      height: null,
      follow: false,
      showDropdown: true,
      following: [],
      relativeUsers: false,
      imageData: [],
      videoData: [],
      textData: [],
      id: '',
      auth: null,
      influencerDetails: [],
      profile_image: '',
      loader: true,
      userId: '',
      payment: '',
    };
  }

  async componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    const user = await AsyncStorage.getItem('userToken');
    if (user != null) {
      this.setState({auth: user.toString()});
    }
    this.setState({id: this.props.route.params.id});

    this.getInfluencerDetails();
    this.getImagePost();
  }
  async getInfluencerDetails() {
    const userToken = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');

    this.setState({userId: userId});

    if (this.state.auth != '' && this.state.id != '' && userToken != null) {
      let axiosConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWJlZTJjMzg3Nzg1ZjA5NzljY2ZiY2EiLCJlbWFpbCI6InRhbWFuQDEyMy5nbWFpbC5jb20iLCJtb2JpbGUiOiI3MDA3MzMyNzI3IiwiaWF0IjoxNjQxNjI0OTc0LCJleHAiOjE2NDQyMTY5NzR9.7DYVd6nVLLpi1-nGsOwE7pudxfkcTN1gHZTFarMQdAQ',
        },
      };
      let url =
        'http://18.190.154.188:9000/inflncr/getInfluencerDetails/' +
        this.state.id;

      axios
        .get(url, axiosConfig)
        .then(res => {
          this.setState({influencerDetails: res.data.Data});

          this.setState({payment: res.data.Data.rate_per_hour});
        })
        .catch(err => {});
    }
  }
  getImagePost() {
    let axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWJlZTJjMzg3Nzg1ZjA5NzljY2ZiY2EiLCJlbWFpbCI6InRhbWFuQDEyMy5nbWFpbC5jb20iLCJtb2JpbGUiOiI3MDA3MzMyNzI3IiwiaWF0IjoxNjQxNjI0OTc0LCJleHAiOjE2NDQyMTY5NzR9.7DYVd6nVLLpi1-nGsOwE7pudxfkcTN1gHZTFarMQdAQ',
      },
    };
    let url =
      'http://18.190.154.188:9000/inflncr/getInfluencerImagePosts/' +
      this.state.id;

    axios
      .get(url, axiosConfig)
      .then(response => {
        let data = response.data.Data;

        let arr = this.state.imageData;
        data.forEach(element => {
          arr.push({id: element._id, uri: element.desc});
        });

        this.setState({imageData: arr});

        this.setState({loader: false});
      })
      .catch(function (error) {
        // alert(error);
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
    let url =
      'http://18.190.154.188:9000/inflncr/getInfluencerTextPosts/' +
      this.state.id;

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
      })
      .catch(function (error) {
        // alert(error);
      });
  }

  getVideoPost() {
    let axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWJlZTJjMzg3Nzg1ZjA5NzljY2ZiY2EiLCJlbWFpbCI6InRhbWFuQDEyMy5nbWFpbC5jb20iLCJtb2JpbGUiOiI3MDA3MzMyNzI3IiwiaWF0IjoxNjQxNjI0OTc0LCJleHAiOjE2NDQyMTY5NzR9.7DYVd6nVLLpi1-nGsOwE7pudxfkcTN1gHZTFarMQdAQ',
      },
    };
    let url =
      'http://18.190.154.188:9000/inflncr/getInfluencerVideoPosts/' +
      this.state.id;

    axios
      .get(url, axiosConfig)
      .then(response => {
        let data = response.data.Data;

        let arr = this.state.videoData;
        data.forEach(element => {
          arr.push({id: element._id, uri: element.data.url});
        });

        this.setState({videoData: arr});
      })
      .catch(function (error) {});
  }
  async onFollow(id) {
    let selected = this.state.following;
    if (selected.includes(id)) {
      selected.splice(selected.indexOf(id), 1);
    } else {
      selected.push(id);
    }
    this.setState({following: selected});
  }
  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'This is message demo and this is url demo: http://kb-codes.github.io/',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  renderTextPost = (item, key) => {
    return (
      <View key={key}>
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
    const renderItem = ({index, item}) => {
      return (
        <View
          style={{
            borderRadius: 10,
            elevation: 2,
            backgroundColor: 'white',
            padding: 10,
            width: width / 2.5,
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 250,
            margin: 10,
            marginLeft: 0,
          }}>
          <Text
            style={{
              ...styles.primarySText,
              color: '#015DD3',
              textAlign: 'center',
            }}>
            Influencer hhh Username
          </Text>
          <Image
            source={require('../../assets/images/profile_image.png')}
            style={{
              height: 65,
              width: 65,
            }}
          />
          <Text style={{...styles.secondaryMText, color: '#011E46'}}>
            MD Opthamologist
          </Text>
          <Text style={{...styles.primarySText}}>2.5M followers</Text>

          <TouchableOpacity
            onPress={() => {
              this.onFollow(index);
            }}
            style={{
              ...styles.submitBtnWrapper,
              backgroundColor: this.state.following.includes(index)
                ? '#F2F7FD'
                : colors.primaryBackground,
              paddingHorizontal: 20,
              paddingVertical: 5,
            }}>
            <Text
              style={{
                ...styles.primaryMTextBold,
                color: this.state.following.includes(index)
                  ? '#677890'
                  : 'white',
              }}>
              {this.state.following.includes(index) ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    if (this.state.loader) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={'black'} />
        </View>
      );
    }
    return (
      <CollapsibleNavBarScrollView
        style={{backgroundColor: 'white'}}
        headerMinHeight={100}
        headerMaxHeight={this.state.relativeUsers ? 670 : 400}
        header={
          <View style={{backgroundColor: 'white'}}>
            <View>
              <SafeAreaView style={{...styles.headerWrapper}}>
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}
                    style={{paddingRight: 10}}>
                    <Image
                      source={require('../../assets/icons/back.png')}
                      style={{
                        width: 24,
                        height: 24,
                      }}
                    />
                  </TouchableOpacity>
                  <Text style={{...styles.primaryMTextBold, color: '#677890'}}>
                    {this.state.influencerDetails.name}
                  </Text>
                </View>
                <TouchableOpacity onPress={this.onShare}>
                  <Image
                    source={require('../../assets/icons/share.png')}
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                </TouchableOpacity>
              </SafeAreaView>

              <View
                style={{
                  marginHorizontal: 30,
                }}>
                <View style={{...styles.row, paddingVertical: 20}}>
                  <Image
                    source={
                      this.state.profile_image == ''
                        ? require('../../assets/images/dummy.png')
                        : {
                            uri: this.state.profile_image,
                          }
                    }
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
                        paddingVertical: 2,
                      }}>
                      {this.state.influencerDetails.name}
                    </Text>
                    <Text style={{...styles.secondaryMText, color: '#011E46'}}>
                      {this.state.influencerDetails.description}
                    </Text>
                    <Text style={{...styles.secondaryMText, color: '#677890'}}>
                      Exp: {this.state.influencerDetails.years_Active} years •
                      2.5M followers
                    </Text>

                    <View
                      style={{
                        ...styles.row,
                        justifyContent: 'space-between',
                        paddingVertical: 10,
                      }}>
                      <TouchableOpacity
                        activeOpacity={false}
                        onPress={() => {
                          this.props.navigation.navigate('AboutUser', {
                            profile_image: this.state.profile_image,
                            influencerDetails: this.state.influencerDetails,
                          });
                        }}>
                        <View
                          style={{
                            ...styles.row,
                            backgroundColor: '#F2F7FD',
                            borderRadius: 12,
                            elevation: 3,
                            justifyContent: 'center',
                            width: 70,
                            padding: 2,
                          }}>
                          <Image
                            source={require('../../assets/icons/info.png')}
                            style={{
                              width: 14,
                              height: 14,
                              marginRight: 5,
                            }}
                          />
                          <Text
                            style={{
                              ...styles.secondaryMText,
                              color: '#677890',
                            }}>
                            About
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            relativeUsers: !this.state.relativeUsers,
                          });
                        }}>
                        <Entypo
                          name={
                            this.state.relativeUsers
                              ? 'chevron-down'
                              : 'chevron-up'
                          }
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({follow: !this.state.follow});
                    this.setState({relativeUsers: true});
                  }}>
                  <View
                    style={{
                      ...styles.submitBtnWrapper,
                      backgroundColor: this.state.follow
                        ? '#F2F7FD'
                        : colors.primaryBackground,
                    }}>
                    <Text
                      style={{
                        ...styles.primaryMTextBold,
                        color: this.state.follow ? '#677890' : 'white',
                        textAlign: 'center',
                      }}>
                      {this.state.follow ? 'Following' : 'Follow'}
                    </Text>
                  </View>
                </TouchableOpacity>

                {this.state.relativeUsers && (
                  <View>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      data={ProfileData}
                      renderItem={renderItem}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={{
                    ...styles.submitBtnWrapper,
                    backgroundColor: 'white',
                    elevation: 2,
                    marginVertical: 10,
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('Book', {
                      user_id: this.state.userId,
                      influencer_id: this.state.id,
                      payment: this.state.payment,
                    });
                  }}>
                  <Text
                    style={{
                      ...styles.primaryMText,
                      color: '#677890',
                      textAlign: 'center',
                    }}>
                    Book appointment
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TabBar
              selectedTab={this.state.selectedTab}
              onPressTab1={() => {
                this.setState({
                  selectedTab: 1,
                });
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
        onChangeState={state => {}}>
        {this.state.selectedTab == 1 && (
          <MasonryList
            images={this.state.imageData}
            columns={2}
            spacing={4}
            imageContainerStyle={{borderRadius: 10}}
            onPressImage={item => {
              this.setState({selectedImg: item.uri});
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
            {/* <FlatList
              data={this.state.textData}
              renderItem={this.renderTextPost}
              keyExtractor={(item) => item.id}
            /> */}
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
                  style={{
                    alignSelf: 'center',
                    width: width - 60,
                    height: 590,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'black',
                    borderRadius: 10,
                  }}
                  source={this.state.videoData.uri}
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
    );
  }
}
