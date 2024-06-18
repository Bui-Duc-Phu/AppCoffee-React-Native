import { View, Text, StyleProp, ViewStyle, TextStyle, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import React, { ReactNode, useState } from 'react';
import TextComponent from './TextComponent';
import { globalStyles } from '../styles/globalStyles';
import { appColor } from '../contasts/appColor';

interface Props {
    icon?: ReactNode;
    text: string;
    type?: 'primary' | 'text' | 'link';
    color?: string;
    styles?: StyleProp<ViewStyle>;
    textColor?: string;
    textSize?: number;
    textStyle?: StyleProp<TextStyle>;
    onPress?: () => void;
    iconFlex?: 'right' | 'left';
    paddingLeftIcon?: number;
    paddingRightIcon?: number;
}

const ButtonComponent = (props: Props) => {
    const { icon, text, type, color, styles, textColor, textStyle, onPress, iconFlex, textSize, paddingLeftIcon, paddingRightIcon } = props;

    const [iconSize, setIconSize] = useState({ width: 0, height: 0 });

    const onIconLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setIconSize({ width, height });
    };

    return (
        type === 'primary' ?
        (

            <TouchableOpacity
                style={[
                    globalStyles.buton,
                    {
                        backgroundColor: color ?? appColor.dodgerblue,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    styles,
                ]}
                onPress={onPress}
            >
                {icon && iconFlex === 'left' && (
                    <View onLayout={onIconLayout} style={{ marginLeft: paddingLeftIcon ?? 0 }}>
                        {icon}
                    </View>
                )}

                {icon && iconFlex === undefined && (
                    <View onLayout={onIconLayout} style={{ marginLeft: paddingLeftIcon ?? 0 }}>
                        {icon}
                    </View>
                )}
    
    
                {icon && iconFlex === 'right' && <View style={{ width: iconSize.width + (paddingRightIcon ?? 0) }} />}
    
                <TextComponent
                    text={text}
                    color={textColor}
                    size={textSize}
                    styles={[{ textAlign: 'center', flex: 1 }, textStyle]}
                />
    
                {icon && iconFlex === 'left' && <View style={{ width: iconSize.width + (paddingLeftIcon ?? 0) }} />}

                {icon && iconFlex === undefined && <View style={{ width: iconSize.width + (paddingLeftIcon ?? 0) }} />}
    
                {icon && iconFlex === 'right' && (
                    <View onLayout={onIconLayout} style={{ marginRight: paddingRightIcon ?? 0}}>
                        {icon}
                    </View>
                )}

                
            </TouchableOpacity> 
        ) : type === 'link' ? (
            <TouchableOpacity style={styles} onPress={onPress}>
                <TextComponent  
                    text={text}
                    color={textColor ?? appColor.primary}
                    size={textSize}
                    styles={[ textStyle]} 
                />
            </TouchableOpacity>

        ) :  (
            <TouchableOpacity style={styles} onPress={onPress}>
                <TextComponent  
                    text={text}
                    color={textColor }
                    size={textSize}
                    styles={[ textStyle]} 
                />
            </TouchableOpacity>
        )
    );
};

export default ButtonComponent;
