import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
} from 'react-native';
import styles from './styles';
import colors from '../../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import data from '../../constants/data';
import MasonryList from 'react-native-masonry-list';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Video from 'react-native-video';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ExpertContentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      occassionModal: true,
      shouldPlay: false,
      visible: false,
      selectedImg: '',
      width: null,
      height: null,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{...styles.headerWrapper}}>
          <Text style={{...styles.primaryLTextBold}}>Get expert advice</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('BecomeInfluencer');
            }}>
            <Text style={{...styles.secondarySText, color: '#677890'}}>
              Become influencer
            </Text>
          </TouchableOpacity>
        </SafeAreaView>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ExpertCategoryList');
          }}>
          <View
            style={{
              ...styles.row,
              justifyContent: 'space-between',
              backgroundColor: '#F2F7FD',
              paddingVertical: 10,
              paddingHorizontal: 30,
              marginVertical: 20,
            }}>
            <View>
              <Text style={styles.secondarySText}>
                Get Expert consultation for all your concerns
              </Text>
              <Text
                style={{
                  ...styles.primaryMTextBold,
                  color: colors.primaryBackground,
                }}>
                Book an appointment
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>
        <View style={{marginHorizontal: 15}}>
          <TouchableOpacity
            onPress={() => {
              this.setState({occassionModal: true});
            }}>
            <Text
              style={{
                ...styles.secondarySText,
                color: colors.primaryBackground,
                textAlign: 'right',
              }}>
              How to use this space
            </Text>
          </TouchableOpacity>
          <Modal
            transparent={true}
            onRequestClose={() => {
              this.setState({occassionModal: false});
            }}
            animationType={'fade'}
            visible={this.state.occassionModal}>
            <View style={styles.containerModel}>
              <View style={styles.modal}>
                <Text
                  style={{
                    ...styles.primaryLTextBold,
                    color: colors.primaryBackground,
                  }}>
                  How to use expert zone
                </Text>
                <View>
                  <Video
                    style={{
                      alignSelf: 'center',
                      width: width / 1.5,
                      height: 160,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'black',
                    }}
                    source={{
                      uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
                    }}
                    shouldPlay={this.state.shouldPlay}
                    resizeMode="contain"
                    isLooping
                  />
                  {!this.state.shouldPlay && (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({shouldPlay: true});
                      }}
                      style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        top: 60,
                      }}>
                      <FontAwesome name="play" size={40} color="white" />
                    </TouchableOpacity>
                  )}
                </View>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({occassionModal: false});
                  }}
                  style={{
                    ...styles.submitBtnWrapper,
                    width: width / 2,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      ...styles.primaryMTextBold,
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    Got it
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View
            style={{
              ...styles.row,
              justifyContent: 'space-between',
              backgroundColor: '#F2F7FD',
              borderRadius: 20,
              padding: 8,
              borderWidth: 0.5,
              borderColor: '#B3CEF2',
              marginVertical: 10,
            }}>
            <Image
              source={require('../../assets/icons/search.png')}
              style={{width: 24, height: 24}}
            />
            <TextInput
              style={{width: width / 1.5}}
              placeholder="What are you looking for?"
            />
            <Image
              source={require('../../assets/icons/mic.png')}
              style={{width: 24, height: 24}}
            />
          </View>
        </View>
        <MasonryList
          images={data}
          columns={2}
          spacing={3}
          imageContainerStyle={{borderRadius: 10}}
          onPressImage={item => {
            this.setState({selectedImg: item.uri});
            this.setState({width: item.masonryDimensions.width});
            this.setState({height: item.masonryDimensions.height});
            this.setState({visible: true});
          }}
        />
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
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{
                padding: 1,
                backgroundColor: 'white',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={{uri: this.state.selectedImg}}
                style={{
                  width: this.state.width * 2,
                  height: this.state.height * 2,
                  borderRadius: 10,
                }}
              />
            </View>
          </TouchableOpacity>
        </Modal>

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
    );
  }
}
