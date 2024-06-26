
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import OnboardingScreen from '../screens/auth/OnboardingScreen';
import { LoginScreen } from '../screens';
import SignUpScreen from '../screens/auth/SignUpScreen';


const AuthNavigator = () => {

  const Stack = createNativeStackNavigator();


  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='OnboardingScreen' component={OnboardingScreen} />
      <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
  
      
    </Stack.Navigator>
  )
}

export default AuthNavigator