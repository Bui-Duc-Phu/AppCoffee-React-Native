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
import { isValidEmail } from '../../utils/isEmail';




const initValue = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

interface ErorMessage {
  errEmail: string,
  errPassword: string,
  errFullname: string
}


const SignUpScreen = ({ navigation }: any) => {


  const [values, setValues] = useState(initValue);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState<ErorMessage>({ errEmail: 'null', errPassword: '', errFullname: '' });
  const [isShowError, setIsShowError] = useState(false);
  var verifiCode = '' 

  const handleChangeValue = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };
  const hasErrors = (errors: any) => {
    return Object.values(errors).some(error => error !== '');
  };







  const headerSignUp = async () => {
    validate()
    if (!hasErrors(errMessage)) {
      console.log('vao roi')
      console.log('vao roi 2', isShowError)
      setLoading(true)

      verifi()
    }
  };

  const verifi = async() =>{
    try {
      const res : any = await authenticationAPI.HandleAuthentication(
        '/verification',
        {
          email : values.email
        },
        'post'
      )
      if( res &&  res.status === 200){
        LogRespone(res.data)
        navigation.navigate('VerificationScreen',{
          code: res.data.data.code,
          ...values,
        });
        setLoading(false) 
      }else{
        LogRespone(res.data)
        setLoading(false)     
      }
    } catch (error) {
       console.log('verifi errr : ',error)
       setLoading(false)
      
    }
  }

  const validate = async () => {
    let isValid = true;
    let cnt = 1

    if (!values.fullName
      && !errMessage.errPassword.includes('All information must be entered!')
      && !errMessage.errEmail.includes('All information must be entered!')

    ) {
      isValid = false;
      ++cnt
      setErrMessage(prev => ({ ...prev, errFullname: 'All information must be entered!' }));
    } else {
      setErrMessage(prev => ({ ...prev, errFullname: '' }));
    }


    if (!values.email && !errMessage.errPassword.includes('Email & Password is required!') && cnt === 1) {
      setErrMessage(prev => ({ ...prev, errEmail: 'All information must be entered!' }));
      console.log(errMessage.errEmail)
      ++cnt
      isValid = false;
    } else if (values.email && !isValidEmail(values.email)) {
      setErrMessage(prev => ({ ...prev, errEmail: 'Invalid email!' }));
      isValid = false;
    } else {
      setErrMessage(prev => ({ ...prev, errEmail: '' }));
    }


    if ((!values.confirmPassword || !values.password) && cnt === 1) {
      setErrMessage(prev => ({ ...prev, errPassword: 'All information must be entered!' }));
      isValid = false;
    } else if (values.password && values.password.length < 6) {
      setErrMessage(prev => ({ ...prev, errPassword: 'Password must be at least 6 characters long!' }));
      isValid = false;
    } else if (values.password && values.password !== values.confirmPassword) {
      setErrMessage(prev => ({ ...prev, errPassword: 'Confirm Password is incorrect!' }));
      isValid = false;
    } else {
      setErrMessage(prev => ({ ...prev, errPassword: '' }));
    }

    console.log(errMessage)

    setIsShowError(!isValid);
  }




  return (
    <>

      <Container isScroll styles={[{ paddingTop: 70, }]}>


        <RowComponent styles={{ width: '100%', paddingStart: '5%' }} justify='flex-start'>
          <TextComponent text='Sign Up' font={fontFamilies.bold} size={30} flex={0} color='darkred' />
        </RowComponent>

        <SpaceComponent height={10} />

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
            onEnd={validate}
          />
        </BoxView>


        <SpaceComponent height={10} />

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
            onEnd={validate}
          />
        </BoxView>


        <SpaceComponent height={10} />

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
            onEnd={validate}
          />
        </BoxView>


        <SpaceComponent height={10} />

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
            onEnd={validate}
          />
        </BoxView>


        <SpaceComponent height={10} />

        {isShowError && (
          <CardView styles={{ justifyContent: 'flex-start', paddingStart: 20 }}>
            <BoxView styles={{ justifyContent: 'flex-start' }}>
              {errMessage.errFullname && <TextComponent text={errMessage.errFullname} size={12} bold color={'red'} />}
              {errMessage.errEmail && <TextComponent text={errMessage.errEmail} size={12} bold color={'red'} />}
              {errMessage.errPassword && <TextComponent text={errMessage.errPassword} size={12} bold color={'red'} />}
            </BoxView>
          </CardView>
        )}

        <SpaceComponent height={40} />

        <ButtonComponent
          type='primary'
          onPress={() => headerSignUp()}
          text='Sign Up'
          textColor={appColor.darkred}
          textSize={17}
          styles={{ marginHorizontal: '20%', }}
          font={fontFamilies.semiBold}
          color={appColor.white}
          borderRadius={12}
        />


        <SpaceComponent height={40} />
        <RowComponent >
          <TextComponent text='already have a account?' flex={0} />
          <SpaceComponent width={5} />
          <TextComponent text='Login' color={appColor.link} flex={0} underline onPress={() => console.log()} />
        </RowComponent>
      </Container>
      <Loading visible={loading} title='Loading ...' />
    </>
  );
}



export default SignUpScreen;