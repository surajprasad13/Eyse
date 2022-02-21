import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  LogBox,
} from 'react-native';
import styles from '../styles';

import {launchImageLibrary} from 'react-native-image-picker';

import Feather from 'react-native-vector-icons/Feather';

import Carousel from 'react-native-snap-carousel';
import colors from '../../../constants/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class RatioButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{
          paddingVertical: 10,
          marginVertical: 10,
          backgroundColor:
            this.props.ratio == this.props.id
              ? colors.primaryBackground
              : 'black',

          borderColor: '#99A5B5',
          borderWidth: 0.2,
          borderRadius: 5,
          width: width / 3 - 30,
        }}>
        <Text
          style={{
            ...styles.primaryMTextBold,
            color: 'white',
            textAlign: 'center',
          }}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default class ChooseImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: [],
      activeSlide: 0,
      photos: null,
      noOfImages: 20,
      visible: false,
      ratio: 2,
    };
  }

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    this.askPermission();
  }
  async askPermission() {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, response => {
      if (response.assets) {
        this.setState({
          photos: response.assets,
        });
      }
    });
  }
  async onSelectImage(uri, width, height) {
    let selectedIn = this.state.selectedImage;
    if (selectedIn.includes(uri)) {
      selectedIn.splice(selectedIn.indexOf(uri), 1);
    } else {
      selectedIn.push(uri);
    }
    this.setState({selectedImage: selectedIn});
  }
  render() {
    const renderImage = ({index, item}) => {
      return (
        <View style={{alignItems: 'center', width: width - 60}}>
          <View style={{borderRadius: 1, elevation: 5, marginVertical: 10}}>
            <Image
              source={{uri: item}}
              style={{
                width: 300,
                height:
                  this.state.ratio == 1
                    ? 430
                    : this.state.ratio == 2
                    ? 300
                    : this.state.ratio == 3 && 200,
              }}
            />
            <View
              style={{
                backgroundColor: '#011E46',
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 15,
                position: 'absolute',
                alignSelf: 'flex-end',
                right: 20,
                bottom: 5,
              }}>
              <Text
                style={{
                  ...styles.primaryXSText,
                  color: 'white',
                }}>
                {index + 1 + ' / ' + this.state.selectedImage.length}
              </Text>
            </View>
          </View>
        </View>
      );
    };

    const renderPhotos = ({index, item}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            this.onSelectImage(item.uri, item.width, item.height);
          }}
          style={{
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'center',
            width: width / 2 - 40,
            height: width / 2 - 40,
            borderWidth: 0.5,
          }}>
          <ImageBackground
            source={{uri: item.uri}}
            blurRadius={this.state.selectedImage.includes(item.uri) ? 10 : 0}
            style={{
              width: width / 2 - 42,
              height: width / 2 - 42,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {this.state.selectedImage.includes(item.uri) && (
              <Feather
                name="check"
                size={45}
                color={colors.primaryBackground}
              />
            )}
          </ImageBackground>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
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
                Choose images to upload
              </Text>
              <Text style={{...styles.primaryMTextBold}}>1/3</Text>
            </View>
            {this.state.selectedImage !== null && (
              <View style={{marginTop: 10}}>
                <Carousel
                  style={{flex: 1, overflow: 'visible'}}
                  extraData={this.state.selectedImage}
                  data={this.state.selectedImage}
                  ref={c => {
                    this._carousel = c;
                  }}
                  renderItem={renderImage}
                  windowSize={1}
                  itemWidth={width}
                  containerWidth={width}
                  sliderWidth={width}
                  itemHeight={height}
                  inActiveOpacity={0.5}
                  onSnapToItem={index => this.setState({activeSlide: index})}
                />
                <View
                  style={{
                    ...styles.row,
                    justifyContent: 'space-between',
                    width: width - 60,
                  }}>
                  <RatioButton
                    id={1}
                    title="Portrait"
                    onPress={() => {
                      this.setState({ratio: 1});
                    }}
                    ratio={this.state.ratio}
                  />
                  <RatioButton
                    id={2}
                    title="Square"
                    onPress={() => {
                      this.setState({ratio: 2});
                    }}
                    ratio={this.state.ratio}
                  />
                  <RatioButton
                    id={3}
                    title="Landscape"
                    onPress={() => {
                      this.setState({ratio: 3});
                    }}
                    ratio={this.state.ratio}
                  />
                </View>
              </View>
            )}

            {this.state.photos != null ? (
              <>
                <FlatList
                  data={this.state.photos}
                  numColumns={2}
                  columnWrapperStyle={{justifyContent: 'space-between'}}
                  showsVerticalScrollIndicator={false}
                  renderItem={renderPhotos}
                  keyExtractor={item => item.id}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.setState(
                      {
                        noOfImages: this.state.noOfImages + 20,
                      },
                      () => this.askPermission(),
                    );
                  }}
                  style={{
                    backgroundColor: 'green',
                    borderRadius: 25,
                    padding: 5,
                    marginBottom: 100,
                    width: 100,
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{...styles.primaryMTextBold, color: 'white'}}>
                    load more
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <ActivityIndicator
                size="large"
                color={colors.primaryBackground}
              />
            )}
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            disabled={this.state.selectedImage.length == 0 ? true : false}
            onPress={() => {
              this.props.navigation.navigate('TagProducts', {
                selectedImage: this.state.selectedImage,
                ratio: this.state.ratio,
              });
            }}
            style={{
              ...styles.submitBtnWrapper,
              paddingVertical: 10,
              opacity: this.state.selectedImage.length == 0 ? 0.8 : 1,
              width: width - 60,
            }}>
            <Text
              style={{
                ...styles.primaryMTextBold,
                color: 'white',
                textAlign: 'center',
              }}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
