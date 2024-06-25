import { View, Text, TouchableOpacity, TextInput, StyleSheet, StyleProp, ViewStyle, Keyboard } from 'react-native';
import React, { ReactNode, useEffect, useState } from 'react';
import { Eye, EyeSlash } from 'iconsax-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { appColor } from '../contasts/appColor';
import { globalStyles } from '../styles/globalStyles';
import SpaceComponent from './SpaceComponent';

interface Props {
    value?: string;
    onChangeText: (val: string) => void;
    affix?: ReactNode;
    suffix?: ReactNode;
    hint?: string;
    alowClear?: boolean;
    isPassword?: boolean;
    styles?: StyleProp<ViewStyle>;
}




const InputComponent = (props: Props) => {
    const { value, onChangeText, affix, suffix, hint, alowClear, isPassword, styles } = props;

    const [isShowPass, setIsShowPass] = useState(isPassword ?? false);
    const [focused, setFocused] = useState(false);






    return (
        <View style={[stylesContainer.layout, styles, { borderColor: focused ? 'blue' : 'gray' }]}>
            {affix ?? affix}
            {affix && <SpaceComponent width={7} />}
            <TextInput
                placeholder={hint ?? ''}
                onChangeText={val => onChangeText(val)}
                value={value}
                placeholderTextColor={'darkgray'}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                secureTextEntry={isPassword && isShowPass}
                style={[stylesContainer.inputText, globalStyles.text, { color: appColor.text }]}
                autoCapitalize='none'
            />
            <TouchableOpacity onPress={() => setIsShowPass(!isShowPass)}>
                {
                    isPassword && (
                        isShowPass ? <EyeSlash size={20} color={appColor.gray} /> : <Eye size={20} color={appColor.gray} />
                    )
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alowClear && onChangeText('')}>
                {
                    value && alowClear && !isPassword && <AntDesign name='close' size={22} color={appColor.gray} />
                }
            </TouchableOpacity>
            {suffix && <SpaceComponent width={10} />}
            {suffix}
        </View>
    );
}

const stylesContainer = StyleSheet.create({
    layout: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 15,
        backgroundColor: 'rgba(211 ,211 ,211,0.1)',
        padding: 4,
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 10,
    },
    inputText: {
        flex: 1,
    },
});

export default InputComponent;