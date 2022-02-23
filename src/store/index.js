import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from './reducers/authReducer';
import {shopReducer} from './reducers/shopReducer';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: [],
};
const shopPersistConfig = {
  key: 'shop',
  storage: AsyncStorage,
  blacklist: [],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  shop: persistReducer(shopPersistConfig, shopReducer),
});

const store = createStore(
  persistReducer(rootPersistConfig, rootReducer),
  applyMiddleware(thunkMiddleware),
);
const persistor = persistStore(store);

export {store, persistor};
