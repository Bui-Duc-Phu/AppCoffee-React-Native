import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Switch } from 'react-native';
import { BodyView, BoxView, ButtonComponent, CardView, Container, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { globalStyles } from '../../styles/globalStyles';
import { fontFamilies } from '../../contasts/fontFamilies';
import { appColor } from '../../contasts/appColor';

import { getImage } from '../../../assets/images';
import { Lock, Sms } from 'iconsax-react-native';
import authenticationAPI from '../../networks/authAPi';
import { LogRespone } from '../../utils/LogRespone';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth, authSelector } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MMKV } from 'react-native-mmkv';
import { isValidEmail } from '../../utils/isEmail';
import { LoginButton, LoginManager, Profile } from 'react-native-fbsdk-next'

import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Ellipse } from 'react-native-svg';

GoogleSignin.configure({
  webClientId: "390013760484-rsceahn769a4ffqvnsi4he4a7e385h9j.apps.googleusercontent.com",
});

interface ErorMessage {
  errEmail: string,
  errPassword: string


}

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(true);
  const [errMessage, setErrMessage] = useState<ErorMessage>({ errEmail: 'nullll', errPassword: '', });
  const [isShowError, setIsShowError] = useState(false);

  const dispatch = useDispatch();


  const hasErrors = (errors: any) => {
    return Object.values(errors).some(error => error !== '');
  };

  const headerLogin = async () => {
    validate()
    if (!hasErrors(errMessage)) {
      console.log('vao roi')
      console.log(errMessage)
      const res: any = await authenticationAPI.HandleAuthentication('/login', { email, password }, 'post');
      if (res && res.status === 200) {
        LogRespone(res);
        dispatch(addAuth(res.data.userData));
        await AsyncStorage.setItem('auth', rememberPassword ? JSON.stringify(res.data.userData) : email);
      } else {
        console.log('Login failed:', res);
        LogRespone(res);
      }
    }
  }

  const _SignGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      const res: any = await authenticationAPI.HandleAuthentication('/google-signIn', {
        email: userInfo.user.email,
        fullName: userInfo.user.name
      }, 'post')
      if (res && res.status === 200) {
        console.log("data", res.data.userData.email)
        dispatch(addAuth(res.data.userData));
        await AsyncStorage.setItem('auth', rememberPassword ? JSON.stringify(res.data.userData) : email);
      }
      LogRespone(res)
    } catch (error) {
      console.log(error)
    }
  }

  const _SignInFacebook = async () => {
    console.log('sds')
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile'])
      if (result.isCancelled) {
        console.log('login cancelled')
      } else {
        const profile = await Profile.getCurrentProfile()
        console.log(" profile : ", profile)
        if (!profile) {
          console.log("not get profile user")
        } else {
          const data = {
            email: profile.userID,
            fullName: profile.name,
            photoURL: profile.imageURL
          }
          const res : any = await authenticationAPI.HandleAuthentication('/facebook-signIn', data, 'post')

          if(res &&  res.status === 200){
            dispatch(addAuth(res.data.userData))
            await AsyncStorage.setItem('auth', rememberPassword ? JSON.stringify(res.data.userData) : email);
          }

          LogRespone(res)

          
        }
      }
    } catch (error) {
      console.log('err login facebook : ', error)
    }
  }

  const validate = async () => {
    let isValid = true;
    let cnt = 1
    if (!email && !errMessage.errPassword.includes('Email & Password is required!')) {
      setErrMessage(prev => ({ ...prev, errEmail: 'Email & Password is required!' }));
      await ++cnt
      console.log(errMessage.errEmail)
      console.log(cnt)
      isValid = false;
    } else if (email && !isValidEmail(email)) {
      setErrMessage(prev => ({ ...prev, errEmail: 'Invalid email!' }));
      isValid = false;
    } else {
      setErrMessage(prev => ({ ...prev, errEmail: '' }));
    }
    if (!password && !errMessage.errEmail.includes('Email & Password is required!') && cnt === 1) {
      setErrMessage(prev => ({ ...prev, errPassword: 'Email & Password is required!' }));
      isValid = false;
    } else if (password && password.length < 6) {
      setErrMessage(prev => ({ ...prev, errPassword: 'Password must be at least 6 characters long!' }));
      isValid = false;
    } else {
      setErrMessage(prev => ({ ...prev, errPassword: '' }));
    }
    setIsShowError(!isValid);
  }

  return (
    <Container isScroll styles={[{ paddingTop: 70, }]}>
      <CardView><Image source={getImage.logo} style={{ width: 100, height: 100 }} /></CardView>

      <SpaceComponent height={20} />

      <CardView><TextComponent text='Login' font={fontFamilies.bold} size={30} flex={0} color='darkred' /></CardView>

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
          onEnd={validate}
        />
      </BoxView>

      <SpaceComponent height={20} />

      <BoxView name='Box Password'>
        <CardView styles={[{ paddingStart: 10 }]}>
          <TextComponent text='Password' flex={1} bold />
        </CardView>
        <SpaceComponent height={10} />
        <InputComponent
          onChangeText={val => setPassword(val)}
          value={password}
          hint='Enter Password'
          affix={<Lock size={22} color={appColor.gray} />}
          alowClear
          onEnd={validate}
          isPassword
        />
      </BoxView>

      <SpaceComponent height={10} />

      {isShowError && (
        <CardView styles={{ justifyContent: 'flex-start', paddingStart: 20 }}>
          <BoxView styles={{ justifyContent: 'flex-start' }}>
            {errMessage.errEmail && <TextComponent text={errMessage.errEmail} size={12} bold color={'red'} />}
            {errMessage.errPassword && <TextComponent text={errMessage.errPassword} size={12} bold color={'red'} />}
          </BoxView>
        </CardView>
      )}
      <SpaceComponent height={10} />

      <RowComponent name='Remember and forgot password box'>
        <RowComponent name='Remember box' styles={{ flex: 1, justifyContent: 'flex-start' }}>
          <Switch
            value={rememberPassword}
            onValueChange={() => setRememberPassword(!rememberPassword)}
            thumbColor={appColor.darkred}
            trackColor={{ false: appColor.gray2, true: appColor.dodgerblue }}
          />
          <TextComponent text='Remember Me' size={13} color={appColor.black} bold />
        </RowComponent>
        <TextComponent
          onPress={() => {
            navigation.navigate('ForgotPasswordScreen')

          }}
          text='Forgot Password?'
          size={13}
          color={appColor.black}
          bold
          underline
          styles={{ textAlign: 'right', marginEnd: 20 }}
          flex={0}
        />
      </RowComponent>

      <SpaceComponent height={30} />

      <ButtonComponent
        type='primary'
        onPress={headerLogin}
        text='Login'
        textColor='white'
        textSize={20}
        styles={{ marginHorizontal: '20%', borderRadius: 100 }}
        font={fontFamilies.bold}
        color='brown'
      />

      <SpaceComponent height={30} />

      <RowComponent>
        <View style={[globalStyles.centerMap, { flex: 1, height: 1, backgroundColor: appColor.black, marginHorizontal: 10 }]} />
        <TextComponent text='or sign in with' size={13} flex={0} />
        <View style={{ flex: 1, height: 1, backgroundColor: appColor.black, marginHorizontal: 10 }} />
      </RowComponent>

      <SpaceComponent height={20} />

      <RowComponent>
        <TouchableOpacity onPress={_SignGoogle}>
          <Image source={getImage.google} style={{ height: 55, width: 55 }} />
        </TouchableOpacity>
        <SpaceComponent width={20} />
        <TouchableOpacity onPress={_SignInFacebook}>
          <Image source={getImage.facebook} style={{ height: 50, width: 50 }} />
        </TouchableOpacity>
      </RowComponent>

      <SpaceComponent height={30} />

      <RowComponent>
        <TextComponent text='Don’t have an account?' flex={0} />
        <SpaceComponent width={5} />
        <TextComponent text='Sign Up' color={appColor.link} flex={0} underline onPress={() => navigation.navigate('SignUpScreen')} />
      </RowComponent>
    </Container>
  );
}





export default LoginScreen;