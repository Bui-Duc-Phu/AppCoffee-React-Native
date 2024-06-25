import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Button, Text, View } from 'react-native'
import { ButtonComponent } from '../../components'
import { useDispatch } from 'react-redux'
import { removeAuth } from '../../redux/reducers/authReducer'

const HomeScreen = () => {

  const dispatch = useDispatch()
  return (
    <View style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:'white'}}>
     <ButtonComponent  type='primary' text='logout' textColor='black' textSize={15} color='green'
      onPress={()=> dispatch(removeAuth({}))}  />

       
    </View>
  )
}

export default HomeScreen