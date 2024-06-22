import { View, Text, ViewStyle, StyleProp } from 'react-native'
import React, { ReactNode } from 'react'

interface Props {
    children?: ReactNode
    styles?: StyleProp<ViewStyle>
}

const BodyView = (props:Props) => {
    const { children, styles } = props
  return (
    <View style={[styles]}>{children}</View>
  )
}

export default BodyView