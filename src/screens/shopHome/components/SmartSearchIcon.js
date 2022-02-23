import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SmartSearchIcon = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SmartScreen', {visible: true})}
      style={{
        width: 50,
        height: 50,
        backgroundColor: '#FF9E00',
        borderRadius: 48,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <MaterialIcons name={'auto-awesome'} size={24} color={'white'} />
    </TouchableOpacity>
  );
};

export default SmartSearchIcon;
