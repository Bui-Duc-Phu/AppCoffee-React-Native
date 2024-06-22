import { Text, StyleProp, TextStyle, TouchableOpacity } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/globalStyles';

interface Props {
    text?: string;
    size?: number;
    font?: string;
    color?: string;
    bold?: boolean;
    flex?: number;
    styles?: StyleProp<TextStyle>; 
    uppercase?: boolean;
    underline?: boolean;
    onPress?: () => void;
}

const TextComponent = (props: Props) => {
    const { text, font, size, color, bold, flex, styles, uppercase, underline, onPress } = props;

    const textStyles: StyleProp<TextStyle> = [
        {
            flex: flex ?? 1,
            fontFamily: font ?? undefined,
            fontSize: size ?? 16,
            color: color ?? 'black',
            textDecorationLine: underline ? 'underline' : undefined,
            ...(bold && { fontWeight: 'bold' }),
            textTransform: uppercase ? 'uppercase' : undefined,
        },
        styles
    ];

    return onPress ? (
        <TouchableOpacity onPress={onPress}>
            <Text style={textStyles}>{text}</Text>
        </TouchableOpacity>
    ) : (
        <Text style={textStyles}>{text}</Text>
    );
}

export default TextComponent;
