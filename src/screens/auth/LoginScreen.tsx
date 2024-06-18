import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonComponent, SpaceComponent, TextComponent } from '../../components';
import { globalStyles } from '../../styles/globalStyles';
import { fontFamilies } from '../../contasts/fontFamilies';
import { appColor } from '../../contasts/appColor';

const LoginScreen = () => {


  return (
    <View style={[globalStyles.container]}>
      <View style={[globalStyles.layout, { justifyContent: 'center',alignItems:'center' }]}>
      </View>
    </View>
  );
}



export default LoginScreen;
