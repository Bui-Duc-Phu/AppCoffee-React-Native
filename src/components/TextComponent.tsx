import { Text, StyleProp, TextStyle, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import React, { useState, useCallback } from 'react';
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
    witdhText?:(val : number) =>void
}

const TextComponent = (props: Props) => {
    const { text, witdhText ,font, size, color, bold, flex, styles, uppercase, underline, onPress } = props;
    const [textWidth, setTextWidth] = useState<number>(0);

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

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        if(witdhText) witdhText(width)
        setTextWidth(width);
    }, []);

    return onPress ? (
        <TouchableOpacity onPress={onPress}>
            <Text style={textStyles} onLayout={handleLayout}>{text}</Text>
        </TouchableOpacity>
    ) : (
        <Text style={textStyles} onLayout={handleLayout}>{text}</Text>
    );
};

export default TextComponent;
