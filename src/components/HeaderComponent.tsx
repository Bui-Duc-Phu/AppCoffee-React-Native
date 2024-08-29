import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { appInfo } from '../contasts/appInfo'

interface Props{
    children?:ReactNode,
    styles?:StyleProp<ViewStyle>,
}

const HeaderComponent = (props:Props) => {

    const{children,styles} = props
  return (
    <View style={[localstyles.toolbar,styles]}>{children}</View>
  )
}

export default HeaderComponent

const localstyles = StyleSheet.create({
   toolbar:{
    backgroundColor:'white',
    minHeight: appInfo.sizes.HEIGHT*0.105,
    paddingTop:appInfo.sizes.HEIGHT*0.03,
    paddingHorizontal:appInfo.sizes.WIDTH*0.01,
    elevation: 5,
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.1)'
   }
})