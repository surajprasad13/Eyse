import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Share from 'react-native-share';
import Video from 'react-native-video';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// helpers
import RenderProductCard from './components/RenderProductCard';
import {options} from '../../data/Options';
const {height, width} = Dimensions.get('screen');

// fonts
const fontRegular = 'DidactGothic-Regular';
const fontBold = 'PTSans-Bold';

const InfluencerPost = ({navigation, route}) => {
  const [opened, setOpened] = useState(false);
  const [clicked, setClicked] = useState(false);
  const videoRef = useRef();

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        flex: 1,
        height: height,
        width: width,
        backgroundColor: 'black',
      }}
      onPress={() => setClicked(!clicked)}>
      {route.params.type == 'image' ? (
        <ImageBackground
          style={{flex: 1}}
          imageStyle={{resizeMode: 'contain'}}
          source={route.params.image}>
          {!opened ? (
            <View
              style={{
                flexDirection: 'row',
                padding: 20,
                width: width,
                justifyContent: 'space-between',
                //backgroundColor: 'rgba(1,30,70,0.7)',
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {/* <Image
                  style={{
                    height: 28,
                    width: 28,
                    alignSelf: 'center',
                    marginTop: 10,
                  }}
                  source={require('../../assets/images/back-arrow-icon.png')}
                /> */}
                <MaterialCommunityIcons
                  name={'chevron-left'}
                  color={'#fff'}
                  size={32}
                />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', marginLeft: -40}}>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    marginHorizontal: 30,
                    borderRadius: 50,
                  }}
                  source={require('../../assets/images/img3.png')}
                />
                <View style={{alignSelf: 'center'}}>
                  <Text
                    style={{
                      color: '#F2F7FD',
                      fontSize: 16,
                      fontFamily: fontBold,
                    }}>
                    Influencers Name
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: '#F2F7FD',
                        fontSize: 14,
                        fontFamily: fontBold,
                      }}>
                      Follow
                    </Text>
                    <TouchableOpacity onPress={() => setOpened(true)}>
                      {/* <Image
                        source={require('../../assets/images/arrow-down.png')}
                        style={{
                          height: 22,
                          width: 22,
                          alignSelf: 'center',
                          marginHorizontal: 10,
                        }}
                      /> */}
                      <MaterialCommunityIcons
                        name={'chevron-down'}
                        color={'#fff'}
                        size={26}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* <Image
                source={require('../../assets/images/more_vertical.png')}
                style={{height: 28, width: 28, alignSelf: 'center', right: 0}}
              /> */}
              <SimpleLineIcons
                name={'options-vertical'}
                color={'#fff'}
                size={24}
              />
            </View>
          ) : (
            <View
              style={{
                width: width,
                backgroundColor: 'rgba(1,30,70,0.7)',
                padding: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',

                  width: width,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      height: 50,
                      width: 50,
                      marginRight: 30,
                      borderRadius: 50,
                    }}
                    source={require('../../assets/images/img3.png')}
                  />
                  <View style={{alignSelf: 'center'}}>
                    <Text
                      style={{
                        color: '#F2F7FD',
                        fontSize: 16,
                        fontFamily: fontBold,
                      }}>
                      Influencers Name
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#F2F7FD',
                          fontSize: 14,
                          fontFamily: fontBold,
                        }}>
                        Follow
                      </Text>
                      <TouchableOpacity onPress={() => setOpened(false)}>
                        {/* <Image
                          source={require('../../assets/images/arrow-up.png')}
                          style={{
                            height: 22,
                            width: 22,
                            alignSelf: 'center',
                            marginHorizontal: 10,
                          }}
                        /> */}
                        <MaterialCommunityIcons
                          name={'chevron-up'}
                          color={'#fff'}
                          size={26}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {/* <Image
                  source={require('../../assets/images/more_vertical.png')}
                  style={{height: 28, width: 28, alignSelf: 'center', right: 0}}
                /> */}
                <SimpleLineIcons
                  name={'options-vertical'}
                  color={'#fff'}
                  size={24}
                />
              </View>
              <Text
                style={{
                  color: '#F2F7FD',
                  fontSize: 14,
                  fontFamily: fontRegular,
                }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                molestie, ante id tincidunt dapibus... Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. In molestie, ante id
                tincidunt dapibus...
              </Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                {/* <Image
                  source={require('../../assets/images/profile-icon.png')}
                  style={{height: 28, width: 28, alignSelf: 'center', right: 0}}
                /> */}
                <MaterialIcons name={'person'} size={24} color={'#fff'} />
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#fff',
                    fontSize: 14,
                    marginLeft: 10,
                    fontFamily: fontRegular,
                  }}>
                  {' '}
                  2 Products
                </Text>
              </View>
            </View>
          )}
          {clicked ? (
            <View style={{position: 'absolute', bottom: 150, left: 50}}>
              <RenderProductCard />
            </View>
          ) : null}
          <View
            style={{
              height: 120,
              width: width,
              bottom: 0,
              position: 'absolute',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingRight: 20,
            }}>
            <View>
              <View
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 35,
                  backgroundColor: 'rgba(196,196,196,0.7)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 5,
                }}>
                <MaterialCommunityIcons
                  name="pin-outline"
                  color="#011E46"
                  size={24}
                />
              </View>
              <View style={{flexDirection: 'row', marginVertical: 5}}>
                <SimpleLineIcons name="pin" color="#fff" size={18} />
                <Text style={{color: '#fff', marginLeft: 5}}>120</Text>
              </View>
              <TouchableOpacity onPress={() => Share.open(options)}>
                <MaterialCommunityIcons
                  name="share-variant"
                  color="#fff"
                  size={24}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      ) : (
        <View style={{flex: 1, height: height, width: width}}>
          {opened ? (
            <View
              style={{
                width: width,
                backgroundColor: 'rgba(1,30,70,0.7)',
                padding: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',

                  width: width,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      height: 50,
                      width: 50,
                      marginRight: 30,
                      borderRadius: 50,
                    }}
                    source={require('../../assets/images/img3.png')}
                  />
                  <View style={{alignSelf: 'center'}}>
                    <Text
                      style={{
                        color: '#F2F7FD',
                        fontSize: 16,
                        fontFamily: fontBold,
                      }}>
                      Influencers Name
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#F2F7FD',
                          fontSize: 14,
                          fontFamily: fontBold,
                        }}>
                        Follow
                      </Text>
                      <TouchableOpacity onPress={() => setOpened(false)}>
                        {/* <Image
                          source={require('../../assets/images/arrow-up.png')}
                          style={{
                            height: 22,
                            width: 22,
                            alignSelf: 'center',
                            marginHorizontal: 10,
                          }}
                        /> */}
                        <MaterialCommunityIcons
                          name={'chevron-up'}
                          color={'#fff'}
                          size={24}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <Image
                  source={require('../../assets/images/more_vertical.png')}
                  style={{
                    height: 28,
                    width: 28,
                    alignSelf: 'center',
                    right: 0,
                  }}
                />
              </View>
              <Text
                style={{
                  color: '#F2F7FD',
                  fontSize: 14,
                  fontFamily: fontRegular,
                }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                molestie, ante id tincidunt dapibus... Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. In molestie, ante id
                tincidunt dapibus...
              </Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                {/* <Image
                  source={require('../../assets/images/profile-icon.png')}
                  style={{height: 28, width: 28, alignSelf: 'center', right: 0}}
                /> */}
                <MaterialIcons name={'person'} size={24} color={'#fff'} />
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#fff',
                    fontSize: 14,
                    fontFamily: fontRegular,
                  }}>
                  {' '}
                  2 Products
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                padding: 20,
                width: width,
                justifyContent: 'space-between',
                //backgroundColor: 'rgba(1,30,70,0.7)',
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {/* <Image
                  style={{
                    height: 28,
                    width: 28,
                    alignSelf: 'center',
                    marginTop: 10,
                  }}
                  source={require('../../assets/images/back-arrow-icon.png')}
                /> */}
                <MaterialCommunityIcons
                  name={'chevron-left'}
                  color={'#fff'}
                  size={32}
                />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', marginLeft: -40}}>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    marginHorizontal: 30,
                    borderRadius: 50,
                  }}
                  source={require('../../assets/images/img3.png')}
                />
                <View style={{alignSelf: 'center'}}>
                  <Text
                    style={{
                      color: '#F2F7FD',
                      fontSize: 16,
                      fontFamily: fontBold,
                    }}>
                    Influencers Name
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: '#F2F7FD',
                        fontSize: 14,
                        fontFamily: fontBold,
                      }}>
                      Follow
                    </Text>
                    <TouchableOpacity onPress={() => setOpened(true)}>
                      {/* <Image
                        source={require('../../assets/images/arrow-down.png')}
                        style={{
                          height: 22,
                          width: 22,
                          alignSelf: 'center',
                          marginHorizontal: 10,
                        }}
                      /> */}
                      <MaterialCommunityIcons
                        name={'chevron-down'}
                        color={'#fff'}
                        size={24}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* <Image
                source={require('../../assets/images/more_vertical.png')}
                style={{height: 28, width: 28, alignSelf: 'center', right: 0}}
              /> */}
              <SimpleLineIcons
                name={'options-vertical'}
                color={'#fff'}
                size={24}
              />
            </View>
          )}
          <Video
            style={{
              flex: 1,
              height: height,
              width: width,
              marginTop: opened ? -200 : -100,
              zIndex: -1,
            }}
            ref={videoRef}
            source={{
              uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            }}
            resizeMode={'cover'}
            muted={clicked == 1 ? true : false}
            volume={10}
          />
          {/* <HeaderModal opened={true} navigation={navigation} /> */}

          {clicked ? (
            <View style={{position: 'absolute', bottom: 150, left: 50}}>
              <RenderProductCard />
            </View>
          ) : null}
          <View
            style={{
              height: 120,
              width: width,
              bottom: 0,
              position: 'absolute',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingRight: 20,
            }}>
            <View>
              <View
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 35,
                  backgroundColor: 'rgba(196,196,196,0.7)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 5,
                }}>
                <MaterialCommunityIcons
                  name="pin-outline"
                  color="#011E46"
                  size={24}
                />
              </View>
              <View style={{flexDirection: 'row', marginVertical: 5}}>
                <SimpleLineIcons name="pin" color="#fff" size={18} />
                <Text style={{color: '#fff', marginLeft: 5}}>120</Text>
              </View>
              <TouchableOpacity onPress={() => Share.open(options)}>
                <MaterialCommunityIcons
                  name="share-variant"
                  color="#fff"
                  size={24}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default InfluencerPost;
