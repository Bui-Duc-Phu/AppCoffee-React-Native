import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Switch } from 'react-native';
import { BodyView, BoxView, ButtonComponent, CardView, Container, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { globalStyles } from '../../styles/globalStyles';
import { fontFamilies } from '../../contasts/fontFamilies';
import { appColor } from '../../contasts/appColor';

import { getImage } from '../../../assets/images';
import { Lock, Lock1, Sms, User } from 'iconsax-react-native';
import authenticationAPI from '../../networks/authAPi';
import { LogRespone } from '../../utils/LogRespone';
import { Loading } from '../../modals';
import AsyncStorage from '@react-native-async-storage/async-storage';



const initValue = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};


const SignUpScreen = () => {

  const [error, setError] = useState('');
  const [values, setValues] = useState(initValue);
  const [loading, setLoading] = useState(false);


  const handleChangeValue = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };
  
  const headerLogin = async () => {
    setLoading(true)
    if (values.confirmPassword !== values.password) {
      setError('confirm password is not correct');
      setLoading(false)
    } else {
      try {
        const res : any = await authenticationAPI.HandleAuthentication(
          '/create-user',
          {
            email: values.email,
            password: values.password,
            fullName: values.fullName
          },
          'post'
        );
        if (res && res.status === 201) {
          console.log('Register successful');
          await AsyncStorage.setItem('auth',JSON.stringify(res.data.userData))
          LogRespone(res)
          setLoading(false)
        } else {
          setLoading(false)
          if (res.data.SQL_Error && Array.isArray(res.data.SQL_Error)) {
            console.log('Failed to register1:');
            LogRespone(res)
            setError(res.data.SQL_Error.join(', '));
          } else {
            console.log('Failed to register2:', res.message || 'Unknown error');
            setError(res.message || 'Unknown error');
          }
        }
      } 
      catch (error: any) {
        setLoading(false)
        console.log('error server : ', error)
      }
    }
  };



  return (
    <>
  
    <Container   styles={[{ paddingTop: 70, }]}>
      

      <RowComponent styles={{ width: '100%', paddingStart: '5%' }} justify='flex-start'>
        <TextComponent text='Sign Up' font={fontFamilies.bold} size={30} flex={0} color='darkred' />
      </RowComponent>

      <SpaceComponent styles={{ height: '5%' }} />

      <BoxView name='box FullName'>
        <CardView styles={[{ paddingStart: 10 }]}>
          <TextComponent text='Full Name' flex={1} bold />
        </CardView>
        <SpaceComponent height={5} />
        <InputComponent
          onChangeText={val => handleChangeValue('fullName', val)}
          value={values.fullName}
          hint='full name'
          affix={<User size={22} color={appColor.gray} />}
          alowClear
        />
      </BoxView>

      <SpaceComponent styles={{ height: '2%' }} />

      <BoxView name='box Email'>
        <CardView styles={[{ paddingStart: 10 }]}>
          <TextComponent text='Email' flex={1} bold />
        </CardView>
        <SpaceComponent height={5} />
        <InputComponent
          onChangeText={val => handleChangeValue('email', val)}
          value={values.email}
          hint='abc@email.com'
          affix={<Sms size={22} color={appColor.gray} />}
          alowClear
        />
      </BoxView>

      <SpaceComponent styles={{ height: '2%' }} />

      <BoxView name='Box Password'>
        <CardView styles={[{ paddingStart: 10 }]}>
          <TextComponent text='Passwrod' flex={1} bold />
        </CardView>
        <SpaceComponent height={5} />
        <InputComponent
          onChangeText={val => handleChangeValue('password', val)}
          value={values.password}
          hint='password'
          affix={<Lock size={22} color={appColor.gray} />}
          isPassword
        />
      </BoxView>

      <SpaceComponent styles={{ height: '2%' }} />

      <BoxView name='Box confirm Password'>
        <CardView styles={[{ paddingStart: 10 }]}>
          <TextComponent text='Confirm Passwrod' flex={1} bold />
        </CardView>
        <SpaceComponent height={5} />
        <InputComponent
          onChangeText={val => handleChangeValue('confirmPassword', val)}
          value={values.confirmPassword}
          hint='confirm Password'
          affix={<Lock size={22} color={appColor.gray} />}
          isPassword
        />
      </BoxView>

      <View style={{ height: '1%' }} />

      <RowComponent styles={{ width: '100%', paddingStart: '2%' }} justify='flex-start'>
        <TextComponent text={error} font={fontFamilies.bold} size={12} flex={0} color='red' />
      </RowComponent>

      <View style={{ height: '5%' }} />

      <ButtonComponent
        type='primary'
        onPress={() => headerLogin()}
        text='Sign Up'
        textColor={appColor.darkred}
        textSize={17}
        styles={{ marginHorizontal: '20%', }}
        font={fontFamilies.semiBold}
        color={appColor.white}
        borderRadius={12}
      />

      <View style={{ height: '7%' }} />

      <RowComponent >
        <TextComponent text='already have a account?' flex={0} />
        <SpaceComponent width={5} />
        <TextComponent text='Login' color={appColor.link} flex={0} underline onPress={() => console.log()} />
      </RowComponent>
     

    </Container>
    <Loading visible= {loading} title='Loading ...'/>
    </>
  );
}



export default SignUpScreen;