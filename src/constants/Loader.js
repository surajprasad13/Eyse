import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import colors from './colors';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color={colors.primaryBackground} />
      </View>
    );
  }
}
