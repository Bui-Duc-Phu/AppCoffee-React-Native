import { View, Text, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { appColor } from '../contasts/appColor'
import { fontFamilies } from '../contasts/fontFamilies'

interface Props{
    text:string
    size?:number
    color?:string
    flex?:number
    font?:string
    styles?:StyleProp<TextStyle>
    title?:boolean
}


const TextComponent = (props:Props) => {
    const {text,size,color,flex,font,title,styles,} = props
  return <Text style={[
    {
        color : color ?? appColor.text,
        flex : flex ?? 0    ,
        fontSize : size ?? title? 20 :14,
        fontFamily :font ??  title ? fontFamilies.bold : undefined
    },styles
  ]}>{text}</Text>
}

export default TextComponent