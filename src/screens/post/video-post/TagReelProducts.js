import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
} from 'react-native';
import styles from '../styles';

import _ from 'lodash';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import data from '../../../constants/InterestsData';
import Video from 'react-native-video';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class TagReelProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVideo: this.props.route.params.selectedVideo,
      status: {},
      isSearchText: false,
      tagList: [],
      userList: [],
      backupList: [],
      search: '',
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
  tagUser(user) {
    let newView = {
      locationX: this.left,
      locationY: this.top,
      name: user.name,
      id: user.id,
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
    return (
      <View style={{...styles.container, backgroundColor: '#011E46'}}>
        <SafeAreaView style={{...styles.headerWrapper}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              ...styles.primaryLTextBold,
              marginLeft: 10,
              color: 'white',
            }}>
            Create a new post
          </Text>
        </SafeAreaView>

        <View style={{flex: 1}}>
          <View
            style={{
              ...styles.row,
              justifyContent: 'space-between',
              margin: 30,
            }}>
            <Text style={{...styles.primaryMTextBold, color: '#99A5B5'}}>
              Tag products
            </Text>
            <Text style={{...styles.primaryMTextBold, color: '#99A5B5'}}>
              2/3
            </Text>
          </View>

          <View style={{paddingVertical: 10}}>
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
                        this.tagUser(user);
                        this.setState({userList: this.state.backupList});
                      }}>
                      <View
                        style={{
                          borderRadius: 8,
                          ...styles.row,
                          backgroundColor: '#011E46',
                          borderColor: '#99A5B5',
                          borderWidth: 0.2,
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
                          <Text
                            style={{...styles.primaryMText, color: 'white'}}>
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
              <View style={{marginTop: 30}}>
                <TouchableWithoutFeedback
                  onPress={evt => this.handlePress(evt)}
                  disabled={this.state.isSearchText}
                  style={{backgroundColor: 'black'}}>
                  <Video
                    paused={true}
                    style={{
                      alignSelf: 'center',
                      width: width - 60,
                      height: height / 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    source={{
                      uri: this.state.selectedVideo,
                    }}
                    shouldPlay={this.state.shouldPlay}
                    resizeMode="contain"
                    isLooping
                    onPlaybackStatusUpdate={status =>
                      //this.setState({ status: status })
                      console.log(status)
                    }
                  />
                </TouchableWithoutFeedback>
                {this.state.tagList.map(list => (
                  <View key={list.id} style={this.dynamicStyle(list)}>
                    <View style={styles.tagTriangle}></View>
                    <View style={styles.tagUserView}>
                      <Text style={styles.tagListText}> {list.name} </Text>
                      <TouchableOpacity
                        style={{marginLeft: 5}}
                        key={list.id}
                        onPress={() => {
                          this.removeUser(list);
                        }}>
                        <AntDesign
                          name="closecircle"
                          size={25}
                          color="#ababab"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
        <View style={{margin: 30}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('AddReelDesc', {
                selectedVideo: this.state.selectedVideo,
                tagList: this.state.tagList,
              });
            }}
            style={{
              ...styles.submitBtnWrapper,
              paddingVertical: 10,
              marginVertical: 10,
              backgroundColor: '#011E46',
              borderColor: '#99A5B5',
              borderWidth: 0.2,
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
