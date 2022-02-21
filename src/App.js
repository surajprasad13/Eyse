import React from 'react';

import {Provider} from 'react-redux';

import AuthStack from './navigation/AuthStack';
import RootStackNavigation from './navigation/RootStackNavigation';
import {NavigationContainer} from '@react-navigation/native';

import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from './store';
import {SafeAreaProvider} from 'react-native-safe-area-context';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      userToken: '',
      isLogin: false,
      firstLaunch: null,
    };
  }

  async componentDidMount() {
    const user = await AsyncStorage.getItem('userToken');
    if (user != null) {
      this.setState({isLogin: true});
    }
  }
  render() {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            {this.state.isLogin ? <RootStackNavigation /> : <AuthStack />}
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
export default App;
