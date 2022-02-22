import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import {connect} from 'react-redux';

// icons
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {seperateBookingSlots} from '../../common/utils/seperateBookingSlots';
import styles from './styles';

import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

class YourBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: [],
      userId: '',
      bookingData: [],
    };
  }

  onOrganize = bookings => {
    const mapped = {};
    for (let b of bookings) {
      const date = b.booking_slot.date[0]?.slot_start;
      if (mapped[moment(date).format('MM/DD/YYYY')]) {
        mapped[moment(date).format('MM/DD/YYYY')].push(b);
      } else {
        mapped[moment(date).format('MM/DD/YYYY')] = [b];
      }
    }
    return mapped;
  };

  async componentDidMount() {
    const id = await AsyncStorage.getItem('userId');
    const token = JSON.parse(await AsyncStorage.getItem('userToken'));

    await api
      .get(`bookings/getUserBookingDetails/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        this.setState({bookingData: this.onOrganize(response.data.Data)});
      })
      .catch(error => {
        console.log(error?.response, 'error');
      });
  }
  onCollapse = i => {
    let opened = this.state.opened;
    opened[i] = !this.state.opened[i];
    this.setState({opened});
  };

  navigate = (item, join) => {
    this.props.navigation.navigate('UserSideDetails', {
      join: join,
      is_expert: item?.influencer_id?.if_expert,
      booking_slot: item?.booking_slot,
      name: item?.influencer_id?.name,
      highest_degree: item?.influencer_id?.highest_degree,
      profileimage: item?.influencer_id?.profile_image?.url,
      experience: item?.influencer_id?.years_Active,
      description: item?.influencer_id?.description,
      location: item?.influencer_id?.location,
    });
  };

  render() {
    const {bookingData} = this.state;

    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={{...styles.headerWrapper}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={require('../../assets/icons/back.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </TouchableOpacity>
          <Text style={{...styles.primaryLTextBold, marginLeft: 10}}>
            Your bookings
          </Text>
        </SafeAreaView>
        {Object.keys(bookingData)?.map((item, index) => {
          const currentItem = bookingData?.[item];
          const seperatedSlots = seperateBookingSlots(currentItem);
          return (
            <View key={index}>
              <TouchableOpacity
                onPress={() => this.onCollapse(index)}
                style={{
                  ...styles.row,
                  paddingVertical: 15,
                  paddingHorizontal: 30,
                  marginBottom: 30,
                  elevation: 2,
                  borderStyle: 'solid',
                  justifyContent: 'space-between',
                }}>
                <View style={{...styles.row}}>
                  <Text style={{...styles.primaryMTextBold}}>
                    {moment(
                      currentItem?.[0]?.booking_slot?.date?.[0]?.slot_start,
                    ).format('dddd')}{' '}
                  </Text>
                  <Text style={{...styles.primaryMTextBold}}>
                    {moment(
                      currentItem?.[0]?.booking_slot?.date?.[0]?.slot_start,
                    ).format('Do')}
                  </Text>
                </View>
                <View style={{...styles.row}}>
                  <Text style={{...styles.secondarySText, color: '#FF9E00'}}>
                    {bookingData?.[item]?.length} calls{' '}
                  </Text>
                  {this.state.opened?.[index] ? (
                    <Entypo name="chevron-down" size={24} color="black" />
                  ) : (
                    <Entypo name="chevron-up" size={24} color="black" />
                  )}
                </View>
              </TouchableOpacity>

              {this.state.opened?.[index] && (
                <View>
                  {seperatedSlots.morning.length > 0 ? (
                    <View style={{marginHorizontal: 30, marginVertical: 10}}>
                      <Text style={{...styles.secondaryMText}}>Morning</Text>
                    </View>
                  ) : null}
                  {seperatedSlots.morning.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index + item._id}
                        onPress={() => this.navigate(item, false)}
                        style={{
                          backgroundColor: '#F2F7FD',
                          ...styles.row,
                          paddingHorizontal: 30,
                          paddingVertical: 10,
                          justifyContent: 'space-between',
                          marginVertical: 10,
                        }}>
                        <Text
                          style={[{...styles.primaryMTextBold}, styles.flex_3]}>
                          {item.influencer_id.name}
                        </Text>
                        <Text
                          style={[{...styles.secondarySText}, styles.flex_5]}>
                          {moment(
                            item?.booking_slot?.date?.[0]?.slot_start,
                          ).format('hh:mm A')}{' '}
                          -{' '}
                          {moment(
                            item?.booking_slot?.date?.[0]?.slot_end,
                          ).format('hh:mm A')}
                        </Text>
                        <Ionicons
                          name="chevron-forward-outline"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    );
                  })}
                  {seperatedSlots.afternoon.length > 0 ? (
                    <View style={{marginHorizontal: 30, marginVertical: 10}}>
                      <Text style={{...styles.secondaryMText}}>Afternoon</Text>
                    </View>
                  ) : null}
                  {seperatedSlots.afternoon.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index + item._id}
                        onPress={() => this.navigate(item, false)}
                        style={{
                          backgroundColor: '#F2F7FD',
                          ...styles.row,
                          paddingHorizontal: 30,
                          paddingVertical: 10,
                          justifyContent: 'space-between',
                          marginVertical: 10,
                        }}>
                        <Text
                          style={[{...styles.primaryMTextBold}, styles.flex_3]}>
                          {item.influencer_id.name}
                        </Text>
                        <Text
                          style={[{...styles.secondarySText}, styles.flex_5]}>
                          {moment(
                            item?.booking_slot?.date?.[0]?.slot_start,
                          ).format('hh:mm A')}{' '}
                          -{' '}
                          {moment(
                            item?.booking_slot?.date?.[0]?.slot_end,
                          ).format('hh:mm A')}
                        </Text>
                        <Ionicons
                          name="chevron-forward-outline"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    );
                  })}
                  {seperatedSlots.evening.length > 0 ? (
                    <View style={{marginHorizontal: 30, marginVertical: 10}}>
                      <Text style={{...styles.secondaryMText}}>Evening</Text>
                    </View>
                  ) : null}
                  {seperatedSlots.evening.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index + item._id}
                        onPress={() => this.navigate(item, false)}
                        style={{
                          backgroundColor: '#F2F7FD',
                          ...styles.row,
                          paddingHorizontal: 30,
                          paddingVertical: 10,
                          justifyContent: 'space-between',
                          marginVertical: 10,
                        }}>
                        <Text
                          style={[{...styles.primaryMTextBold}, styles.flex_3]}>
                          {item.influencer_id.name}
                        </Text>
                        <Text
                          style={[{...styles.secondarySText}, styles.flex_5]}>
                          {moment(
                            item?.booking_slot?.date?.[0]?.slot_start,
                          ).format('hh:mm A')}{' '}
                          -{' '}
                          {moment(
                            item?.booking_slot?.date?.[0]?.slot_end,
                          ).format('hh:mm A')}
                        </Text>
                        <Ionicons
                          name="chevron-forward-outline"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    );
                  })}
                  {seperatedSlots.night.length > 0 ? (
                    <View style={{marginHorizontal: 30, marginVertical: 10}}>
                      <Text style={{...styles.secondaryMText}}>Night</Text>
                    </View>
                  ) : null}
                  {seperatedSlots.night.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index + item._id}
                        onPress={() => this.navigate(item, false)}
                        style={{
                          backgroundColor: '#F2F7FD',
                          ...styles.row,
                          paddingHorizontal: 30,
                          paddingVertical: 10,
                          justifyContent: 'space-between',
                          marginVertical: 10,
                        }}>
                        <Text
                          style={[{...styles.primaryMTextBold}, styles.flex_3]}>
                          {item.influencer_id.name}
                        </Text>
                        <Text
                          style={[{...styles.secondarySText}, styles.flex_5]}>
                          {moment(
                            item?.booking_slot?.date?.[0]?.slot_start,
                          ).format('hh:mm A')}{' '}
                          -{' '}
                          {moment(
                            item?.booking_slot?.date?.[0]?.slot_end,
                          ).format('hh:mm A')}
                        </Text>
                        <Ionicons
                          name="chevron-forward-outline"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(YourBooking);
