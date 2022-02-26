import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
//import Share from "react-native-share";

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useSelector} from 'react-redux';
import {styles} from './components/styles';

const {width} = Dimensions.get('screen');
const Cart = ({navigation}) => {
  const cartData = useSelector(state => state.shop.cartData);
  const [nav, setNav] = useState('Add');
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.header}>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.goBack();
          }}
          background={TouchableNativeFeedback.Ripple('#E6E8EC', true)}>
          <View style={styles.iconBtn}>
            <Image
              source={require('../../assets/images/back-arrow-icon.png')}
              style={styles.icon24}
              resizeMode="contain"
            />
          </View>
        </TouchableNativeFeedback>

        <Text style={styles.headerTitle}>Your Cart</Text>

        <TouchableNativeFeedback
          onPress={() => {
            //  Share.open(options);
          }}
          background={TouchableNativeFeedback.Ripple('#E6E8EC', true)}>
          <View style={styles.iconBtn}>
            <Image
              source={require('../../assets/images/share.png')}
              style={styles.icon24}
              resizeMode="contain"
            />
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={{flexDirection: 'row', marginLeft: 20}}>
        <TouchableOpacity onPress={() => setNav('Add')}>
          <Text
            style={{
              color: nav == 'Add' ? '#015DD3' : '#B3BBC7',
              marginHorizontal: 10,
              fontFamily: fontMedium,
              fontSize: 14,
            }}>
            Your Items
          </Text>
          <View
            style={{
              height: 2,
              width: 25,
              backgroundColor: nav == 'Add' ? '#015DD3' : '#fff',
              marginHorizontal: 10,
            }}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNav('Save')}>
          <Text
            style={{
              color: nav == 'Save' ? '#015DD3' : '#B3BBC7',
              marginHorizontal: 10,
              fontFamily: fontMedium,
              fontSize: 14,
            }}>
            Save for Later
          </Text>
          <View
            style={{
              height: 2,
              width: 25,
              backgroundColor: nav == 'Save' ? '#015DD3' : '#fff',
              marginHorizontal: 10,
            }}></View>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 20}}>
        {cartData.map((item, index) => (
          <View
            key={index}
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              height: 150,
              width: width,
            }}>
            <Image
              source={{uri: item.prdct_attributes.media[0].url}}
              style={{height: 150, width: 150}}
            />
            <View
              style={{justifyContent: 'space-around', marginHorizontal: 50}}>
              <Text
                style={{
                  color: '#015DD3',

                  fontFamily: fontBold,
                  fontSize: 16,
                }}>
                Product Name
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '65%',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: '#015DD3',

                      fontFamily: fontRegular,
                      fontSize: 14,
                    }}>
                    Rs. 2000
                  </Text>
                  <Text
                    style={{
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                      marginLeft: 10,
                      color: '#B3BBC7',

                      fontFamily: fontRegular,
                      fontSize: 14,
                    }}>
                    3500
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#FF9E00',
                    fontFamily: fontRegular,
                    fontSize: 14,
                  }}>
                  20% off
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '60%',
                }}>
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 28,
                    elevation: 3,
                    backgroundColor: '#fff',

                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color: '#99A5B5',
                      fontFamily: fontRegular,
                      fontSize: 12,
                    }}>
                    {nav != 'Save' ? 'Save for Later' : 'Go to Cart'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name={'delete'}
                    size={25}
                    color={'#B3BBC7'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <View style={{width: width, padding: 35, marginTop: 50}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={STYLE.itemName}>Total</Text>
            <Text style={STYLE.itemAmount}>Rs 10000</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={STYLE.itemName}>Interest</Text>
            <Text style={STYLE.itemAmount}>Rs 1000</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={STYLE.itemName}>Other charges & tax</Text>
            <Text style={STYLE.itemAmount}>Rs 500</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 20,
            }}>
            <Text
              style={{
                ...STYLE.itemName,
                fontSize: 24,
                color: '#015DD3',
                fontFamily: fontBold,
              }}>
              Grand Total
            </Text>
            <Text
              style={{
                ...STYLE.itemAmount,
                fontSize: 24,
                color: '#015DD3',
                fontFamily: fontBold,
              }}>
              Rs 11500
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          width: 320,
          bottom: 30,
          backgroundColor: '#015DD3',
          height: 50,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            ...STYLE.itemAmount,
            fontSize: 16,
            color: '#fff',
            fontFamily: fontBold,
          }}>
          Proceed to Payment
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const fontRegular = 'DidactGothic-Regular';
const fontMedium = 'PTSans-Regular';
const fontBold = 'PTSans-Bold';

export default Cart;

const STYLE = StyleSheet.create({
  itemName: {
    textAlign: 'left',
    fontSize: 16,
    color: '#011E46',
    fontFamily: fontRegular,
  },
  itemAmount: {
    textAlign: 'left',
    fontFamily: fontMedium,
    color: '#011E46',
  },
});
