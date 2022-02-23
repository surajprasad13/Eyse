import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';

import Video from 'react-native-video';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import RenderProductCard from './RenderProductCard';

const {height, width} = Dimensions.get('screen');

const ProductReviews = ({
  name,
  photo,
  description,
  pin,
  text,
  navigation,
  type,
}) => {
  const [collection, setCollection] = useState(false);
  const [pressed, setPressed] = useState(false);

  const [clicked, setClicked] = useState(false);
  const [pause, setPause] = useState(true);
  useEffect(() => {
    setPause(false);
  }, []);
  return (
    <View style={styles.reviewContainer}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Modal
          visible={collection}
          onRequestClose={() => setCollection(false)}
          transparent={true}>
          <TouchableOpacity
            onPress={() => setCollection(false)}
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                width: width,
                position: 'absolute',
                bottom: 0,
              }}>
              <TouchableOpacity
                onPress={() => setCollection(false)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVertical: 20,
                }}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    //borderStyle: 'dashed',
                    //borderWidth: 1,
                    borderColor: '#015DD3',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                  }}>
                  <MaterialIcons
                    name={'collections-bookmark'}
                    size={28}
                    color={'#015DD3'}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: fontMedium,
                    fontSize: 18,
                    color: '#011E46',
                    textAlign: 'left',
                  }}>
                  Visit My Collection
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCollection(false)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVertical: 20,
                }}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    borderColor: '#015DD3',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                  }}>
                  <Ionicons name={'add'} size={28} color={'#015DD3'} />
                </View>
                <Text
                  style={{
                    fontFamily: fontMedium,
                    fontSize: 18,
                    color: '#011E46',
                    textAlign: 'left',
                  }}>
                  Create new folder
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/images/img11.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
            <Text
              style={{fontFamily: fontMedium, fontSize: 14, color: '#011E46'}}>
              {name}
            </Text>
            <Text
              style={{fontFamily: fontMedium, fontSize: 14, color: '#677890'}}>
              Follow
            </Text>
          </View>
        </View>
        <SimpleLineIcons
          name={'options-vertical'}
          size={20}
          color={'#99A5B5'}
        />
      </View>
      {text ? (
        <View style={{backgroundColor: '#F2F7FD', marginVertical: 15}}>
          <Text style={styles.textReview}>{description}</Text>
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            type == 'video'
              ? setClicked(!clicked)
              : navigation.navigate('InfluencerContainer', {
                  image: photo,
                  type: type,
                })
          }>
          {type == 'video' ? (
            <View>
              <Video
                source={{
                  uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                }} // Can be a URL or a local file.
                //ref={videoRef} // Store reference             // Callback when video cannot be loaded
                //controls={true}
                resizeMode={'cover'}
                muted
                pause={pause}
                style={{height: 450, width: '100%', marginTop: 10}}
              />
              {clicked ? (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 50,
                    left: 20,
                    zIndex: 3,
                  }}>
                  <RenderProductCard />
                </View>
              ) : null}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Reels', {
                    image: photo,
                    type: type,
                  })
                }
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 5,
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  top: 20,
                  right: 20,
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcons
                  name={'play-arrow'}
                  color={'#011E46'}
                  size={26}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <Image
              source={photo}
              style={{
                width: '100%',
                height: 100,
                marginTop: 10,
                resizeMode: 'contain',
              }}
            />
          )}
        </TouchableOpacity>
      )}
      <View style={{flexDirection: 'row', marginLeft: 20, paddingVertical: 10}}>
        <TouchableOpacity
          onPress={() => setPressed(!pressed)}
          style={{flexDirection: 'row'}}>
          {pressed ? (
            <SimpleLineIcons name="pin" size={14} color={'black'} />
          ) : (
            <SimpleLineIcons name="pin" size={14} color={'#677890'} />
          )}
          <Text
            style={{
              fontFamily: fontRegular,
              fontSize: 14,
              color: '#677890',
              alignSelf: 'center',
              marginHorizontal: 10,
            }}>
            12
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCollection(true)}
          style={styles.floatingActionBtn}>
          <MaterialCommunityIcons
            name="pin-outline"
            size={30}
            color={'#011E46'}
          />
        </TouchableOpacity>
      </View>
      {text ? null : (
        <Text
          style={{
            fontFamily: fontRegular,
            fontSize: 14,
            color: '#677890',
          }}>
          {description}
        </Text>
      )}
      <TouchableOpacity
        style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <MaterialIcons name="share" size={24} color={'#99A5B5'} />
      </TouchableOpacity>
    </View>
  );
};

const fontRegular = 'DidactGothic-Regular';
const fontMedium = 'PTSans-Regular';

export default ProductReviews;

const styles = StyleSheet.create({
  floatingActionBtn: {
    width: 55,
    height: 55,
    borderRadius: 30,
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    right: 8,
    bottom: 20,
  },
  icon28: {
    width: 28,
    height: 28,
  },
  reviewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 22,
    borderRadius: 10,
    elevation: 5,
  },
  profileImage: {width: 50, height: 50, borderRadius: 50, marginRight: 10},
  textReview: {
    fontFamily: fontRegular,
    fontSize: 16,
    color: '#677890',
    alignSelf: 'center',
    marginHorizontal: 10,
    paddingVertical: 21,
  },
});
