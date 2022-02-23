import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/shopHome/Home';
import ProductDetailsContainer from '../screens/product/ProductDetailsContainer';
import InfluencerContainer from '../screens/store/InfluencerContainer';
import Cart from '../screens/store/Cart';
import AboutStore from '../screens/store/AboutStore';
import SmartScreen from '../screens/shopHome/SmartScreen';
import TextToSpeech from '../screens/shopHome/textToSpeech';
import CameraSmartSearch from '../screens/shopHome/cameraSearch';
import ImageSearch from '../screens/shopHome/ImageSearch';
import LocationSearch from '../screens/shopHome/LocationSearch';
const Stack = createNativeStackNavigator();

export default class ShopStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="ProductDetailsContainer"
          component={ProductDetailsContainer}
        />
        <Stack.Screen
          name="InfluencerContainer"
          component={InfluencerContainer}
        />
        <Stack.Screen name="CartScreen" component={Cart} />
        <Stack.Screen name="AboutStore" component={AboutStore} />
        <Stack.Screen name="SmartScreen" component={SmartScreen} />
        <Stack.Screen name="TextToSpeech" component={TextToSpeech} />
        <Stack.Screen name="cameraSearch" component={CameraSmartSearch} />
        <Stack.Screen name="ImageSearch" component={ImageSearch} />
        <Stack.Screen name="LocationSearch" component={LocationSearch} />
      </Stack.Navigator>
    );
  }
}
