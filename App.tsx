import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView } from 'react-native';
import { SplashScreen } from './src/screens';
import AuthNavigator from './src/navigators/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigators/MainNavigator';


const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [assetToken, setAssetToken] = useState('');
  
  const {getItem, setItem} = useAsyncStorage("assetToken");


  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    checklogin()
  }, []);



  const checklogin = async() =>{
    const token =await getItem()
    token && setAssetToken(token)
    console.log(token)
  }

  


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
        
          {assetToken ? <MainNavigator/> : <AuthNavigator/>}
        </NavigationContainer>
      )}
    </SafeAreaView>
  );
};

export default App;
