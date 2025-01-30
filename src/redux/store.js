const { configureStore, combineReducers } = require("@reduxjs/toolkit");

import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import foodListingReducers from "./Reducers/orderReducers";
import authReducers from './Reducers/authReducers';
import perInfoReducers from './Reducers/perInfoReducers';
import regFormReducers from './Reducers/regFormReducers';
import subscriptionReducers from './Reducers/subscriptionReducers';
import locationReducers from './Reducers/locationReducers';
import orderReducers from './Reducers/orderReducers';



const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['err'],
}
const reducer = combineReducers({
  auth: authReducers,
  orderScreen:orderReducers,
  prnInfo: perInfoReducers,
  registrationForm: regFormReducers,
  subciptions: subscriptionReducers,
  locations:locationReducers
})

const persistReducers = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store