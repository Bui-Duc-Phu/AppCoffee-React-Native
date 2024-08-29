
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import OnboardingScreen from '../screens/auth/OnboardingScreen';
import { ForgotPasswordScreen, LoginScreen, Testscreen, VerificationScreen } from '../screens';
import SignUpScreen from '../screens/auth/SignUpScreen';
import { MMKV } from 'react-native-mmkv';


const AuthNavigator = () => {
  const [isOnboarding, setIsOnboarding] = useState(true);

  const mmkv = new MMKV();
  

  const getEmail = async () =>{
    const data2 = await mmkv.getString('mmvkData')
    console.log('data  2 : ',data2)
    if(data2) {
      setIsOnboarding(false)
      console.log('setfalse')
    }
  }
  useEffect(()=>{
    getEmail()
  },[])

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
      <Stack.Screen name='VerificationScreen' component={VerificationScreen} />
      <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} />
      
    </Stack.Navigator>
  )
}

export default AuthNavigator