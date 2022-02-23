import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {typography} from '../../../common/typography';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeHeader = ({visible}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingHorizontal: 35,
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width,
        height: 80,
        marginBottom: -20,
      }}>
      {/* <TouchableOpacity style={{alignSelf: 'center'}}>
        <MaterialCommunityIcons
          name="account-circle-outline"
          color="#015DD3"
          size={27.5}
        />
      </TouchableOpacity> */}

      <Text
        style={{
          fontSize: 14,
          color: '#011E46',
          alignSelf: 'center',
          fontFamily: typography.NotoSansSemiBold,
        }}>
        Shop
      </Text>

      <TouchableOpacity style={{alignSelf: 'center'}}>
        <MaterialIcons name="shopping-cart" color="#011E46" size={27.5} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

{
  /*
<View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
      }}>
      <TouchableOpacity style={{alignSelf: 'center'}}>
        <MaterialCommunityIcons
          name="account-circle-outline"
          color="#015DD3"
          size={27.5}
        />
      </TouchableOpacity>
      <View
        style={{
          width: 202,
          backgroundColor: '#F2F7FD',
          height: 60,
          alignSelf: 'center',
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 14, color: '#373737'}}>Logo</Text>
      </View>
      <TouchableOpacity style={{alignSelf: 'center'}}>
        <MaterialIcons name="shopping-cart" color="#015DD3" size={27.5} />
      </TouchableOpacity>
    </View>
*/
}
