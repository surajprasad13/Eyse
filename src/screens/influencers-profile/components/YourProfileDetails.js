import React from 'react';
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  Share,
} from 'react-native';
import styles from '../styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const width = Dimensions.get('window').width;

export default class YourProfileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      influencerDetails: this.props.influencerDetails,
      profile_image: this.props.profile_image,
    };
  }

  render() {
    const onShare = async () => {
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

    return (
      <View>
        <View
          style={{
            marginHorizontal: 30,
          }}>
          <View style={{...styles.row, paddingVertical: 10}}>
            <Image
              source={
                this.state.profile_image == ''
                  ? require('../../../assets/images/dummy.png')
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
                Exp: {this.state.influencerDetails.years_Active} years • 2.5M
                followers
              </Text>

              <View style={{...styles.row, paddingVertical: 10}}>
                <TouchableOpacity
                  activeOpacity={false}
                  onPress={() => {
                    this.props.navigate('AboutUser', {
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
                <TouchableOpacity onPress={onShare}>
                  <Image
                    source={require('../../../assets/icons/share.png')}
                    style={{
                      width: 21,
                      height: 21,
                      marginLeft: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigate('EditProfile');
            }}
            style={{
              ...styles.submitBtnWrapper,
              backgroundColor: 'white',
              elevation: 2,
            }}>
            <Text
              style={{
                ...styles.primaryMText,
                color: '#015DD3',
                textAlign: 'center',
              }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigate('InfluencerSideBookings');
          }}
          style={{
            ...styles.row,
            justifyContent: 'space-between',
            backgroundColor: '#F2F7FD',
            paddingVertical: 10,
            paddingHorizontal: 30,
            marginVertical: 20,
          }}>
          <Text style={styles.primaryMText}>Your bookings</Text>
          <View style={{...styles.row}}>
            <Text
              style={{
                ...styles.secondaryMText,
                marginRight: 10,
                color: '#FF9E00',
              }}>
              13 calls
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
