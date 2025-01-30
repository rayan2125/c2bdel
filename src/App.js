import 'react-native-gesture-handler';

import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect } from 'react';
// import NetInfo from '@react-native-community/netinfo';

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import RootNavigation from './navigation/rootNavigation';
import { NativeBaseProvider } from 'native-base';

const App = () => {
  let persistor = persistStore(store);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       if (!state.isConnected) {
//         Alert.alert('No Internet Connection', 'Please check your internet connection.');
//       }
//     });

//     return () => unsubscribe();
//   }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <NavigationContainer>
            <RootNavigation/>
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
