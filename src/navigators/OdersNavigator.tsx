import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { OdersScreen, ProfileScreen } from '../screens'

const OdersNavigator = () => {

    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{
        headerShown : false,
    }}
    >
        <Stack.Screen name='OdersScreen' component={OdersScreen}/>
    </Stack.Navigator>
  )
}

export default OdersNavigator