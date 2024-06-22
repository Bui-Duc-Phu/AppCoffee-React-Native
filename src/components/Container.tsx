import { View, Text, ScrollView, StyleProp, ViewStyle } from 'react-native'
import React, { Children, ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles'


interface Props{
    isScroll?:boolean,
    centerOnMap?:boolean,
    children?:ReactNode,
    styles?:StyleProp<ViewStyle>
    
}

const Container = (props:Props) => {

    const {isScroll,centerOnMap,children,styles} = props
  return (
    isScroll ? (
      centerOnMap
      ?  <ScrollView style={[globalStyles.container,globalStyles.centerMap,styles]}>{children}</ScrollView>
      :  <ScrollView style={[globalStyles.container,styles]}>{children}</ScrollView>
    ):(
        centerOnMap
       ? <View style={[globalStyles.container,globalStyles.centerMap,styles]}>{children}</View>
       : <View style={[globalStyles.container,styles]}>{children}</View>
    )
    
     
  )
}

export default Container