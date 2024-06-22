import { View, Text, ViewStyle, StyleProp } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles'

interface Props {
    children?: ReactNode
    styles?: StyleProp<ViewStyle>
    name?:string
}

const BoxView = (props:Props) => {
    const { children, styles } = props
  return (
    <View style={[styles]}>{children}</View>
  )
}

export default BoxView