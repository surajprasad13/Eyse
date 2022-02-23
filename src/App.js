import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import AuthStack from './navigation/AuthStack';
import RootStackNavigation from './navigation/RootStackNavigation';
import {persistor, store} from './store';

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
    const isLogin = store.getState()?.auth?.authToken;

    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <StatusBar barStyle="dark-content" backgroundColor="white" />
              {isLogin ? <RootStackNavigation /> : <AuthStack />}
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
export default App;
