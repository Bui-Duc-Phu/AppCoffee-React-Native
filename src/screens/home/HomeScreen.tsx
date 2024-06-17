import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Button, View } from 'react-native'

const HomeScreen = () => {
  return (
    <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
    
    <Button
        onPress={async ()=>{ await AsyncStorage.clear()
        }}
        title="Logout"
        color="red" 
      />

   
    </View>
  )
}

export default HomeScreen