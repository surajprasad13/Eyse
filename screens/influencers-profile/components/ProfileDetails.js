import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Share,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from '../styles';
import colors from '../../../constants/colors';
import ProfileData from '../../../constants/ProfileData';

const width = Dimensions.get('window').width;

export default class ProfileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      follow: false,
      showDropdown: true,
      following: [],
      relativeUsers: false,
    };
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
            source={require('../../../assets/images/profile_image.png')}
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
    return (
      <View>
        <SafeAreaView style={{...styles.headerWrapper}}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{paddingRight: 10}}>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </TouchableOpacity>
            <Text style={{...styles.primaryMTextBold, color: '#677890'}}>
              Influencers User Name
            </Text>
          </View>
          <TouchableOpacity onPress={this.onShare}>
            <Image
              source={require('../../../assets/icons/share.png')}
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
              source={require('../../../assets/images/profile_image.png')}
              style={{
                width: 90,
                height: 90,
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
                Influencers Name
              </Text>
              <Text style={{...styles.secondaryMText, color: '#011E46'}}>
                MD Opthamologist
              </Text>
              <Text style={{...styles.secondaryMText, color: '#677890'}}>
                Exp: 20 years • 2.5M followers
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
                    this.props.navigation.navigate('AboutUser');
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
                      source={require('../../../assets/icons/info.png')}
                      style={{
                        width: 14,
                        height: 14,
                        marginRight: 5,
                      }}
                    />
                    <Text style={{...styles.secondaryMText, color: '#677890'}}>
                      About
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({relativeUsers: !this.state.relativeUsers});
                  }}>
                  <Entypo
                    name={
                      this.state.relativeUsers ? 'chevron-down' : 'chevron-up'
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
              this.props.navigation.navigate('Book');
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
    );
  }
}
