import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {width} = Dimensions.get('screen');

const HeaderModal = ({opened, navigation}) => {
  const [isOpened, setIsOpened] = useState(opened);
  return (
    <View>
      {isOpened ? (
        <Modal
          transparent={true}
          visible={isOpened}
          style={{flex: 1, backgroundColor: 'transparent'}}>
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
                    <TouchableOpacity onPress={() => setIsOpened(false)}>
                      <Image
                        source={require('../../assets/images/arrow-up.png')}
                        style={{
                          height: 22,
                          width: 22,
                          alignSelf: 'center',
                          marginHorizontal: 10,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Image
                source={require('../../assets/images/more_vertical.png')}
                style={{height: 28, width: 28, alignSelf: 'center', right: 0}}
              />
            </View>
            <Text
              style={{
                color: '#F2F7FD',
                fontSize: 14,
                fontFamily: fontRegular,
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              molestie, ante id tincidunt dapibus... Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. In molestie, ante id tincidunt
              dapibus...
            </Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Image
                source={require('../../assets/images/profile-icon.png')}
                style={{height: 28, width: 28, alignSelf: 'center', right: 0}}
              />
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
        </Modal>
      ) : (
        <Modal
          transparent={true}
          visible={!isOpened}
          style={{flex: 1, backgroundColor: 'transparent'}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 20,
              width: width,
              justifyContent: 'space-between',
              //backgroundColor: 'rgba(1,30,70,0.7)',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{
                  height: 28,
                  width: 28,
                  alignSelf: 'center',
                  marginTop: 10,
                }}
                source={require('../../assets/images/back-arrow-icon.png')}
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
                  <TouchableOpacity onPress={() => setIsOpened(true)}>
                    <Image
                      source={require('../../assets/images/arrow-down.png')}
                      style={{
                        height: 22,
                        width: 22,
                        alignSelf: 'center',
                        marginHorizontal: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Image
              source={require('../../assets/images/more_vertical.png')}
              style={{height: 28, width: 28, alignSelf: 'center', right: 0}}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const fontRegular = 'DidactGothic-Regular';
const fontBold = 'PTSans-Bold';

export default HeaderModal;

{
  /*
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
            <Image
              style={{
                height: 28,
                width: 28,
                alignSelf: 'center',
                marginTop: 10,
              }}
              source={require('../../assets/images/back-arrow-icon.png')}
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
                  <Image
                    source={require('../../assets/images/arrow-down.png')}
                    style={{
                      height: 22,
                      width: 22,
                      alignSelf: 'center',
                      marginHorizontal: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Image
            source={require('../../assets/images/more_vertical.png')}
            style={{height: 28, width: 28, alignSelf: 'center', right: 0}}
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
                    <Image
                      source={require('../../assets/images/arrow-up.png')}
                      style={{
                        height: 22,
                        width: 22,
                        alignSelf: 'center',
                        marginHorizontal: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Image
              source={require('../../assets/images/more_vertical.png')}
              style={{height: 28, width: 28, alignSelf: 'center', right: 0}}
            />
          </View>
          <Text
            style={{
              color: '#F2F7FD',
              fontSize: 14,
              fontFamily: fontRegular,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            molestie, ante id tincidunt dapibus... Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. In molestie, ante id tincidunt
            dapibus...
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Image
              source={require('../../assets/images/profile-icon.png')}
              style={{height: 28, width: 28, alignSelf: 'center', right: 0}}
            />
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
      )}
*/
}
