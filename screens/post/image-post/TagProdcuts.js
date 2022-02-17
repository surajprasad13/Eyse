import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
} from 'react-native';
import styles from '../styles';

import _ from 'lodash';

import AntDesign from 'react-native-vector-icons/AntDesign';

import Carousel from 'react-native-snap-carousel';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class TagProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: this.props.route.params.selectedImage,
      ratio: this.props.route.params.ratio,
      activeSlide: 0,
      isSearchText: false,
      search: '',
      tagList: [],
      userList: [],
      backupList: [],
    };
    this.top = '';
    this.left = '';
  }
  componentDidMount() {
    this.setState({
      userList: [
        {
          id: 1,
          name: 'Mariko Timothy',
        },
        {
          id: 2,
          name: 'Eldora Seaton ',
        },
        {
          id: 3,
          name: 'Toshia Ellisor ',
        },
        {
          id: 4,
          name: 'Carie Bethune',
        },
        {
          id: 5,
          name: 'Tomoko Jacobi',
        },
        {
          id: 6,
          name: 'Janett Reiling ',
        },
        {
          id: 7,
          name: 'Tomoko Jacobi  ',
        },
        {
          id: 8,
          name: 'Willene Recio',
        },
        {
          id: 9,
          name: 'Emilie Smolka',
        },
        {
          id: 10,
          name: 'Wallace Mallon',
        },
        {
          id: 11,
          name: 'Rosamond Levitan',
        },
        {
          id: 12,
          name: 'Arletha Frost',
        },
        {
          id: 13,
          name: 'Elza Cusson ',
        },
        {
          id: 14,
          name: 'Sybil Menz',
        },
        {
          id: 15,
          name: 'Hannah Jeffrey ',
        },
        {
          id: 16,
          name: 'Raylene Upchurch',
        },
        {
          id: 17,
          name: 'Jewel Rieger',
        },
        {
          id: 18,
          name: 'Bee Lauber',
        },
        {
          id: 19,
          name: 'Forrest Aliff ',
        },
        {
          id: 20,
          name: 'Apryl Kelch ',
        },
        {
          id: 21,
          name: 'Danilo Grass',
        },
        {
          id: 22,
          name: 'Karol Sickles',
        },
        {
          id: 23,
          name: 'Georgetta Davila',
        },
        {
          id: 24,
          name: 'Syreeta Mceuen',
        },
        {
          id: 25,
          name: 'Hillary Antos',
        },
        {
          id: 26,
          name: 'Lacresha Grosvenor',
        },
        {
          id: 27,
          name: 'Genevive Horn  ',
        },
        {
          id: 28,
          name: 'Hyacinth Wiegand ',
        },
        {
          id: 29,
          name: 'Idell Lesesne ',
        },
        {
          id: 30,
          name: 'Elida Summy  ',
        },
      ],
    });

    this.setState({
      backupList: [
        {
          id: 1,
          name: 'Mariko Timothy',
        },
        {
          id: 2,
          name: 'Eldora Seaton ',
        },
        {
          id: 3,
          name: 'Toshia Ellisor ',
        },
        {
          id: 4,
          name: 'Carie Bethune',
        },
        {
          id: 5,
          name: 'Tomoko Jacobi',
        },
        {
          id: 6,
          name: 'Janett Reiling ',
        },
        {
          id: 7,
          name: 'Tomoko Jacobi  ',
        },
        {
          id: 8,
          name: 'Willene Recio',
        },
        {
          id: 9,
          name: 'Emilie Smolka',
        },
        {
          id: 10,
          name: 'Wallace Mallon',
        },
        {
          id: 11,
          name: 'Rosamond Levitan',
        },
        {
          id: 12,
          name: 'Arletha Frost',
        },
        {
          id: 13,
          name: 'Elza Cusson ',
        },
        {
          id: 14,
          name: 'Sybil Menz',
        },
        {
          id: 15,
          name: 'Hannah Jeffrey ',
        },
        {
          id: 16,
          name: 'Raylene Upchurch',
        },
        {
          id: 17,
          name: 'Jewel Rieger',
        },
        {
          id: 18,
          name: 'Bee Lauber',
        },
        {
          id: 19,
          name: 'Forrest Aliff ',
        },
        {
          id: 20,
          name: 'Apryl Kelch ',
        },
        {
          id: 21,
          name: 'Danilo Grass',
        },
        {
          id: 22,
          name: 'Karol Sickles',
        },
        {
          id: 23,
          name: 'Georgetta Davila',
        },
        {
          id: 24,
          name: 'Syreeta Mceuen',
        },
        {
          id: 25,
          name: 'Hillary Antos',
        },
        {
          id: 26,
          name: 'Lacresha Grosvenor',
        },
        {
          id: 27,
          name: 'Genevive Horn  ',
        },
        {
          id: 28,
          name: 'Hyacinth Wiegand ',
        },
        {
          id: 29,
          name: 'Idell Lesesne ',
        },
        {
          id: 30,
          name: 'Elida Summy  ',
        },
      ],
    });
  }
  handlePress(evt) {
    this.top = (evt.nativeEvent.locationY * 100) / height;
    this.left = (evt.nativeEvent.locationX * 100) / width;

    this.setState({
      isSearchText: true,
    });
  }
  tagUser(index, user) {
    let newView = {
      locationX: this.left,
      locationY: this.top,
      name: user.name,
      id: user.id,
      index: index,
    };
    this.setState({
      isSearchText: false,
      tagList: this.state.tagList.concat([newView]),
    });
    console.log('===tagList==', this.state.tagList);
  }
  removeUser(user) {
    let tempUser = this.state.tagList;
    let index = _.findIndex(tempUser, function (o) {
      return o.id == user.id;
    });
    tempUser.splice(index, 1);
    this.setState({tagList: tempUser});
  }
  dynamicStyle(data) {
    let left = (width * data.locationX) / 100;
    let top = (height * data.locationY) / 100;

    return {
      position: 'absolute',
      top: top,
      left: left - 22,
      justifyContent: 'center',
    };
  }
  search = txt => {
    let text = txt.toLowerCase();
    let tracks = this.state.userList;
    let filterTracks = tracks.filter(item => {
      if (item.name.toLowerCase().match(text)) {
        return item;
      }
    });
    this.setState({userList: filterTracks});

    txt.length == 0 && this.setState({userList: this.state.backupList});
  };
  render() {
    const renderImage = ({index, item}) => {
      return (
        <View style={{alignItems: 'center', width: width - 60}}>
          {this.state.isSearchText ? (
            <View>
              <View
                style={{
                  ...styles.row,
                  backgroundColor: '#F2F7FD',
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  marginVertical: 10,
                  marginHorizontal: 30,
                }}>
                <AntDesign name="search1" size={20} color="black" />
                <TextInput
                  style={{width: width / 1.5, marginLeft: 10}}
                  placeholder="Search for user or product"
                  onChangeText={text => {
                    this.search(text);
                  }}
                />
              </View>
              <ScrollView style={{width: width}}>
                {this.state.userList.map(user => (
                  <TouchableWithoutFeedback
                    key={user.id}
                    onPress={() => {
                      this.tagUser(index, user);
                      this.setState({userList: this.state.backupList});
                    }}>
                    <View
                      style={{
                        borderRadius: 8,
                        elevation: 2,
                        ...styles.row,
                        backgroundColor: 'white',
                        height: 70,
                        width: width - 70,
                        marginVertical: 5,
                        alignSelf: 'center',
                      }}>
                      <Image
                        source={require('../../../assets/images/brand-image.png')}
                        style={{width: 90, height: 70}}
                      />
                      <View style={{paddingHorizontal: 10}}>
                        <Text style={{...styles.primaryMText}}>
                          {user.name}
                        </Text>
                        <Text
                          style={{
                            ...styles.secondarySText,
                            color: '#677890',
                          }}>
                          Product name
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </ScrollView>
            </View>
          ) : (
            <View style={{alignItems: 'center'}}>
              <View style={{marginVertical: 20}}>
                <TouchableWithoutFeedback
                  onPress={evt => this.handlePress(evt)}
                  disabled={this.state.isSearchText}>
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
                </TouchableWithoutFeedback>

                {this.state.tagList.map(
                  list =>
                    list.index == index && (
                      <View key={list.id} style={this.dynamicStyle(list)}>
                        <View style={styles.tagTriangle}></View>
                        <View style={styles.tagUserView}>
                          <Text style={styles.tagListText}> {list.name} </Text>
                          <TouchableOpacity
                            style={{marginLeft: 5, padding: 10}}
                            key={list.id}
                            onPress={() => {
                              this.removeUser(list);
                            }}>
                            <AntDesign
                              name="closecircle"
                              size={20}
                              color="#ababab"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ),
                )}

                <View
                  style={{
                    backgroundColor: '#011E46',
                    opacity: 0.7,
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
              <Text style={{...styles.secondarySText, color: '#a1a1a1'}}>
                Tap photo to tag people or product
              </Text>
            </View>
          )}
        </View>
      );
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

        <View style={{flex: 1, margin: 30, justifyContent: 'space-between'}}>
          <View style={{...styles.row, justifyContent: 'space-between'}}>
            <Text style={{...styles.primaryMTextBold}}>Tag products</Text>
            <Text style={{...styles.primaryMTextBold}}>2/3</Text>
          </View>

          <View>
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
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('AddDesc', {
                  selectedImage: this.state.selectedImage,
                  tagList: this.state.tagList,
                });
              }}
              style={{
                ...styles.submitBtnWrapper,
                paddingVertical: 10,
                marginVertical: 10,
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
      </ScrollView>
    );
  }
}
