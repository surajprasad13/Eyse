import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';

import {fonts} from './src/theme';

const App = () => {
  return (
    <SafeAreaView>
      <Text style={{fontFamily: fonts.regular}}>Hello world</Text>
    </SafeAreaView>
  );
};

export default App;
