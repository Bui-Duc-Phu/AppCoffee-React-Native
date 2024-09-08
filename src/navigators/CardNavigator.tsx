import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CardScreen, ProfileScreen } from '../screens'

const CardNavigator = () => {

    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{
        headerShown : false,
    }}
    >
        <Stack.Screen name='CardScreen' component={CardScreen}/>
    </Stack.Navigator>
  )
}

export default CardNavigator