import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import axios from 'axios';

// helpers
import data from '../../constants/data';
import ImagePostView from './components/ImagePostView';
import VideoPostView from './components/VideoPostView';
import TextPostView from './components/TextPostView';
import styles from './styles';
import {colors} from '../../theme';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('screen');

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: data,
      activeSlide: 0,
      auth: '',
      allInfluencer: [],
      userType: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const user = await AsyncStorage.getItem('userToken');
    const userType = await AsyncStorage.getItem('userType');
    this.setState({auth: user});
    this.setState({userType: userType});
    this.getAllInfluencer();
  }
  getAllInfluencer() {
    let axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: this.state.auth,
      },
    };

    axios
      .get('http://18.190.154.188:9000/inflncr/getAllInfluencers', axiosConfig)
      .then(res => {
        this.setState({allInfluencer: res.data.Data});
        this.setState({loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      });
  }
  _renderItem({item, index}) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 20,
          marginHorizontal: 30,
        }}>
        <View style={{backgroundColor: '#C7C7CC', borderRadius: 12}}>
          <Image
            source={{uri: item.uri}}
            style={{
              width: width / 1.3,
              height: 220,
              borderRadius: 12,
            }}
          />
        </View>
        <Text
          style={{
            ...styles.secondaryMText,
            textAlign: 'center',
            color: colors.text,
            width: width / 1.3,
          }}>
          Check out our latest BERG & MIYAMA Collections
        </Text>
      </View>
    );
  }

  get pagination() {
    const {entries, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={6}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 20,
          height: 10,
          borderRadius: 5,
        }}
        inactiveDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: '#C7C7CC',
        }}
        inactiveDotScale={0.6}
      />
    );
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={'black'} />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            borderColor: 'black',
            elevation: 10,
            backgroundColor: 'white',
          }}>
          <SafeAreaView
            style={{
              marginTop: StatusBar.currentHeight,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 30,
              ...styles.row,
            }}>
            <TouchableOpacity
              onPress={() => {
                try {
                  AsyncStorage.clear();
                  alert('Logout successfull !');
                  this.props.navigation.navigate('Login');
                } catch (e) {
                  // clear error
                }
              }}>
              <Image
                source={require('../../assets/icons/account.png')}
                style={{width: 33, height: 33}}
              />
            </TouchableOpacity>

            <View>
              <Text>Logo</Text>
            </View>

            <View style={{...styles.row}}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/icons/shopping_cart.png')}
                  style={{width: 29, height: 29, marginRight: 10}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const path = 'YourBooking';
                  this.props.navigation.navigate(path, {through: 'home'});
                }}>
                <AntDesign name="calendar" size={25} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <View
            style={{
              ...styles.row,
              justifyContent: 'space-between',
              backgroundColor: '#F2F7FD',
              borderRadius: 20,
              paddingHorizontal: 15,
              paddingVertical: 5,
              marginVertical: 10,
              marginHorizontal: 30,
            }}>
            <Image
              source={require('../../assets/icons/search.png')}
              style={{width: 24, height: 24}}
            />
            <TextInput
              style={{width: width / 2}}
              placeholder="What are you looking for?"
            />
            <View style={{...styles.row}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('CameraSearch');
                }}>
                <Image
                  source={require('../../assets/icons/photo_camera.png')}
                  style={{width: 24, height: 24, marginRight: 20}}
                />
              </TouchableOpacity>
              <Image
                source={require('../../assets/icons/mic.png')}
                style={{width: 24, height: 24}}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            ...styles.row,
            marginVertical: 20,
            marginHorizontal: 40,
            justifyContent: 'space-between',
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/profile_image.png')}
              style={{width: 60, height: 60}}
            />
            <Text style={{...styles.secondaryMText}}>Frames</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/profile_image.png')}
              style={{width: 60, height: 60}}
            />
            <Text style={{...styles.secondaryMText}}>Contacts</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/profile_image.png')}
              style={{width: 60, height: 60}}
            />
            <Text style={{...styles.secondaryMText}}>Sunglasses</Text>
          </View>
        </View>
        <View>
          <Carousel
            style={{flex: 1, overflow: 'visible'}}
            data={this.state.entries}
            ref={c => {
              this._carousel = c;
            }}
            renderItem={this._renderItem}
            windowSize={1}
            itemWidth={width}
            containerWidth={width}
            sliderWidth={width}
            itemHeight={height}
            inActiveOpacity={0.5}
            onSnapToItem={index => this.setState({activeSlide: index})}
            autoplay
            autoplayInterval={2000}
          />

          {this.pagination}

          <TouchableOpacity
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              right: 15,
              bottom: 5,
            }}>
            <Image
              source={require('../../assets/icons/smart_search.png')}
              style={{width: 50, height: 50}}
            />
          </TouchableOpacity>
        </View>
        {this.state.userType == 'influencer' && (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('PostType');
            }}
            style={{
              alignSelf: 'flex-end',
              right: 15,
              bottom: 110,
              backgroundColor: 'white',
              borderRadius: 25,
            }}>
            <Image
              source={require('../../assets/icons/post-plus.png')}
              style={{width: 50, height: 50}}
            />
          </TouchableOpacity>
        )}
        <View>
          <ImagePostView
            id="61bee2c387785f0979ccfbca"
            name="taman"
            navigation={this.props.navigation}
          />
        </View>
        <VideoPostView
          navigation={this.props.navigation}
          video={require('../../constants/reel1.mp4')}
        />
        <TextPostView navigation={this.props.navigation} />
      </ScrollView>
    );
  }
}
