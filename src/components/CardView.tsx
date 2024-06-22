import { View, Text, ViewStyle, StyleProp } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles'

interface Props {
    children?: ReactNode
    styles?: StyleProp<ViewStyle>
}

const CardView = (props:Props) => {
    const { children, styles } = props
  return (
    <View style={[{flexDirection:'row'},globalStyles.centerMap,styles]}>{children}</View>
  )
}

export default CardView