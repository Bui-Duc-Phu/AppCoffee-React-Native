import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Switch } from 'react-native';
import { BodyView, BoxView, ButtonComponent, CardView, Container, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { globalStyles } from '../../styles/globalStyles';
import { fontFamilies } from '../../contasts/fontFamilies';
import { appColor } from '../../contasts/appColor';

import { getImage } from '../../../assets/images';
import { Sms } from 'iconsax-react-native';
import authenticationAPI from '../../networks/authAPi';


const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(true);

  

  const headerLogin = async () => {
    console.log('login')
    try{
      const res = await authenticationAPI.HandleAuthentication('/users')
      console.log(res)
      console.log(res.data)
    }catch(err){
      console.log(err)
    }

  }






  return (
    <Container  centerOnMap styles={[{ paddingTop: 70, justifyContent: 'flex-start' }]}>

      <Image source={getImage.logo} style={{ width: 100, height: 100, }} />
      <SpaceComponent height={20} />

      <TextComponent text='Coffe App' font={fontFamilies.bold} size={30} flex={0} color='darkred' />
      <SpaceComponent height={40} />

      <BoxView name='box Email'>
        <CardView styles={[{ paddingStart: 10 }]}>
          <TextComponent text='Email' flex={1} bold />
        </CardView>
        <SpaceComponent height={10} />
        <InputComponent
          onChangeText={val => setEmail(val)}
          value={email}
          hint='Enter Email'
          affix={<Sms size={22} color={appColor.gray} />}
          alowClear
        />
      </BoxView>

      <SpaceComponent height={20} />

      <BoxView name='Box Password'>
        <CardView styles={[{ paddingStart: 10 }]}>
          <TextComponent text='Passwrod' flex={1} bold />
        </CardView>
        <SpaceComponent height={10} />
        <InputComponent
          onChangeText={val => setPassword(val)}
          value={password}
          hint='Enter Email'
          affix={<Sms size={22} color={appColor.gray} />}
          alowClear
        />
      </BoxView>

      <SpaceComponent height={15} />
      <RowComponent >
        <RowComponent styles={{ flex: 1, justifyContent: 'flex-start' }}>
          <Switch
            value={rememberPassword}
            onChange={() => setRememberPassword(!rememberPassword)}
            thumbColor={appColor.darkred}
            trackColor={{ false:appColor.gray2, true:appColor.dodgerblue }}
          />
          <TextComponent text='Remember Me' size={13} color={appColor.black} bold/>
        </RowComponent>
        <TextComponent
          onPress={() => console.log('Forgot Password pressed')}
          text='Forgot Password?'
          size={13}
          color={appColor.black}
          bold
          underline
          styles={{ textAlign: 'right', marginEnd: 20 }}
          flex={0}
        />
      </RowComponent>
      <View style={{ height: '5%' }} />
      <ButtonComponent
        type='primary'
        onPress={() => headerLogin()}
        text='Login'
        textColor='white'
        textSize={20}
        styles={{ marginHorizontal: '20%', borderRadius: 100 }}
        font={fontFamilies.bold}
        color='brown'
      />

      <View style={{ height: '5%' }} />

      <RowComponent  >
        <View style={[globalStyles.centerMap, { flex: 1, height: 1, backgroundColor: appColor.black, marginHorizontal: 10, }]} />
        <TextComponent text='or sign in with' size={13} flex={0} />
        <View style={{ flex: 1, height: 1, backgroundColor: appColor.black, marginHorizontal: 10 }} />
      </RowComponent>

      <View style={{ height: '3%' }} />

      <RowComponent >
        <TouchableOpacity >
          <Image source={getImage.google} style={{ height: 55, width: 55 }} />
        </TouchableOpacity>

        <SpaceComponent width={20} />
        <TouchableOpacity>
          <Image source={getImage.facebook} style={{ height: 50, width: 50 }} />
        </TouchableOpacity>
      </RowComponent>

      <View style={{ height: '7%' }} />

      <RowComponent >
        <TextComponent text='Don’t have a account?' flex={0} />
        <SpaceComponent width={5} />
        <TextComponent text='Sign Up' color={appColor.link} flex={0} underline onPress={() => console.log()} />
      </RowComponent>

    </Container>
  );
}



export default LoginScreen;
