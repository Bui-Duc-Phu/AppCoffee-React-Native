import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Button, Text, View } from 'react-native'
import { ButtonComponent } from '../../components'
import { useDispatch } from 'react-redux'
import { removeAuth } from '../../redux/reducers/authReducer'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { LoginButton, LoginManager, Profile } from 'react-native-fbsdk-next'

const HomeScreen = () => {

  const dispatch = useDispatch()
  return (
    <View style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:'white'}}>
     <ButtonComponent  type='primary' text='logout' textColor='black' textSize={15} color='green'
      onPress={()=>{ 
         AsyncStorage.removeItem('auth');
         AsyncStorage.clear()
         GoogleSignin.signOut()
         LoginManager.logOut()
        dispatch(removeAuth({}))}}  />
    </View>
  )
}

export default HomeScreen