import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';

import colors from '../../constants/colors';
import {UserApi} from '../../axios';
import moment from 'moment';
import {seperateBookingSlots} from '../../common/utils/seperateBookingSlots';
import {connect} from 'react-redux';

//icons
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

class InfluencerSideBookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: [],
      bookingData: [],
      userId: '',
      totalCalls: null,
      total_earnings: null,
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

  onCollapse = i => {
    let opened = this.state.opened;
    opened[i] = !this.state.opened[i];
    this.setState({opened});
  };

  navigate = (item, join) => {
    this.props.navigation.navigate('BookingDetail', {
      name: item?.user_id?.name,
      join: join,
      gender: item?.gender,
      note: item?.note,
      dob: item?.dob,
      slot: item?.booking_slot,
    });
  };

  componentDidMount() {
    //console.log(this.props.auth.userId);
    UserApi.getInfluencerBookingDetails(this.props.auth.userId)
      .then(res => {
        const _data = res.data.Data;
        this.setState({bookingData: this.onOrganize(_data)});
        this.setState({totalCalls: _data?.length});
        const total_earnings = _data.reduce((a, c) => {
          return a + c.amount_of_payment;
        }, 0);
        this.setState({total_earnings});
      })
      .catch(() => {});
  }

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
            Registrations
          </Text>
        </SafeAreaView>
        {this.state.totalCalls ? (
          <Text style={{marginLeft: 30}}>
            {this.state.totalCalls} calls booked
          </Text>
        ) : null}

        <View
          style={{
            marginVertical: 30,
          }}>
          {Object.keys(bookingData)?.map((item, index) => {
            const currentItem = bookingData?.[item];
            const seperatedSlots = seperateBookingSlots(currentItem);
            return (
              <View key={index + item + currentItem?.[0]?._id}>
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
                      {' '}
                      {moment(
                        currentItem?.[0]?.booking_slot?.date?.[0]?.slot_start,
                      ).format('dddd')}{' '}
                    </Text>
                    <Text style={{...styles.primaryMTextBold}}>
                      {' '}
                      {moment(
                        currentItem.booking_slot?.date?.[0]?.slot_start,
                      ).format('Do')}{' '}
                    </Text>
                  </View>
                  <View style={{...styles.row}}>
                    <Text style={{...styles.secondarySText, color: '#FF9E00'}}>
                      {currentItem?.length} calls{' '}
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
                          key={index + item?._id}
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
                            style={[
                              {...styles.primaryMTextBold},
                              styles.flex_3,
                            ]}>
                            {item?.user_id?.name}
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
                        <Text style={{...styles.secondaryMText}}>
                          Afternoon
                        </Text>
                      </View>
                    ) : null}
                    {seperatedSlots.afternoon.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index + item?._id}
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
                            style={[
                              {...styles.primaryMTextBold},
                              styles.flex_3,
                            ]}>
                            {item?.user_id?.name}
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
                          key={index + item?._id}
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
                            style={[
                              {...styles.primaryMTextBold},
                              styles.flex_3,
                            ]}>
                            {item?.user_id?.name}
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
                          key={index + item?._id}
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
                            style={[
                              {...styles.primaryMTextBold},
                              styles.flex_3,
                            ]}>
                            {item?.user_id?.name}
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

          <View style={{margin: 15}}>
            <Text style={{...styles.primaryMTextBold, color: '#B3BBC7'}}>
              TOTAL EARNINGS
            </Text>

            <View
              style={{
                ...styles.row,
                justifyContent: 'space-between',
                marginVertical: 20,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#E6E8EC',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  ...styles.primaryLTextBold,
                  color: colors.primaryBackground,
                }}>
                ₹ {this.state.total_earnings}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(InfluencerSideBookings);
