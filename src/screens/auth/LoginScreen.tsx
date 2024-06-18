import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonComponent, InputComponent, SpaceComponent, TextComponent } from '../../components';
import { globalStyles } from '../../styles/globalStyles';
import { fontFamilies } from '../../contasts/fontFamilies';
import { appColor } from '../../contasts/appColor';
import moduleName from 'module'
import { Eye, Siacoin, Sms } from 'iconsax-react-native';

const LoginScreen = () => {

  const [email, setEmail] = useState('');




  return (
    <View style={[globalStyles.container]}>
      <View >
   
     
      

   
      
  

      </View>
    </View>
  );
}



export default LoginScreen;
