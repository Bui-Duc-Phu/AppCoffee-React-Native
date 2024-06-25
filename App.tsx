import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView } from 'react-native';
import { SplashScreen } from './src/screens';
import AuthNavigator from './src/navigators/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigators/MainNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppRouter from './src/navigators/AppRouter';


const App = () => {






  return (
    <>
      <Provider store={store} >
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
          <NavigationContainer>
            <AppRouter />
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    </>
  );
};

export default App;
