import { ArrowRight, Back, Send } from 'iconsax-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { BoxView, ButtonComponent, CardView, Container, RowComponent, SpaceComponent, TextComponent } from '../../components';
import HeaderComponent from '../../components/HeaderComponent';
import { appColor } from '../../contasts/appColor';
import { getImage } from '../../../assets/images';
import { appInfo } from '../../contasts/appInfo';
import { fontFamilies } from '../../contasts/fontFamilies';
import { hideEmail } from '../../utils/isEmail';
import { Lock, Sms, ArrowSquareRight } from 'iconsax-react-native';
import authenticationAPI from '../../networks/authAPi';

import { LogRespone } from '../../utils/LogRespone';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../../modals';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/reducers/authReducer';


interface code {
    number1: string,
    number2: string,
    number3: string,
    number4: string,
}

const VerificationScreen = ({ navigation, route }: any) => {
    const { code, email, password, fullName } = route.params;



    const [countdown, setCountdown] = useState(60);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [codeValues, setCodeValues] = useState<code>({ number1: '', number2: '', number3: '', number4: '' });
    const [newCode, setNewCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [isShowErr, setIsShowErr] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const dispatch = useDispatch()

    const [corretCode, setCorretCode] = useState(code);

    const input1Ref = useRef<TextInput>(null);
    const input2Ref = useRef<TextInput>(null);
    const input3Ref = useRef<TextInput>(null);
    const input4Ref = useRef<TextInput>(null);


    useEffect(() => {
        countdownFrom120();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    useEffect(() => {
        let code = [codeValues.number1, codeValues.number2, codeValues.number3, codeValues.number4]
        const result = code.join('');
        if (result.length === 4) {
            setNewCode(result)
            console.log('result ', result);
        }

    }, [codeValues])

    useEffect(()=>{
      countdownFrom120()
    },[corretCode])




    const handleChangeValueCode = (val: string, index: number) => {
        const keys = ['number1', 'number2', 'number3', 'number4'];
        const data = { ...codeValues };
        (data as any)[keys[index]] = val;
        setCodeValues(data);
    }


    const countdownFrom120 = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        let cnt = 60;

        intervalRef.current = setInterval(() => {
            setCountdown(cnt);
            cnt--;

            if (cnt < 0) {
                clearInterval(intervalRef.current!);
                intervalRef.current = null;
                setCorretCode('')
                
                setNewCode('')
            }
        }, 1000);
    };
  

    const handleContinue = async () => {
        let show = false
        
        setLoading(true)
        if (newCode) {
            console.log('click : ', newCode)
            if (newCode == corretCode) {
                registerAccount()   
            }else{
                setErrMessage('Code is incorrect !!!')
                console.log('kochinh ')
                show = true
                setLoading(false)
            }
        }else{
            setErrMessage('Code is invalid !!!')  
            setLoading(false)
            show = true
        }
        setIsShowErr(show)
    }
    
    const  handleReSend = async() =>{
      
         try {
            const res : any =  await authenticationAPI.HandleAuthentication(
                '/verification',
                {email:email},
                'post'
            )
            console.log(res)
            LogRespone(res)
            if(res && res.status === 200){
              setCorretCode(res.data.data.code)
              LogRespone(res.data.data)
              console.log(' code : ' , res.data.data.code)
            }else{
                LogRespone(res.data)
                setLoading(false)   
            } 
         } catch (error : any) {
            console.log('err re send',error)
         }

         console.log('correct code : ' , corretCode)
     
     
    }


    const registerAccount = async () => {
        try {
            const res: any = await authenticationAPI.HandleAuthentication(
                '/create-user',
                {
                    email: email,
                    password: password,
                    fullName: fullName
                },
                'post'
            );
            if (res && res.status === 201) {
                console.log('Register successful');
                await AsyncStorage.setItem('auth', JSON.stringify(res.data.userData))
                await AsyncStorage.setItem('localData', JSON.stringify(res.data.userData.email))
                LogRespone(res)
                dispatch(addAuth(res.data.userData))
                setLoading(false)
            } else {
                setLoading(false)
                if (res.data.SQL_Error && Array.isArray(res.data.SQL_Error)) {
                    setLoading(false)
                    console.log('Failed to register1:' ,res.data.SQL_Error);
                    setErrMessage(res.data.SQL_Error)
                    LogRespone(res)
                } else {
                    setLoading(false)
                    console.log('Failed to register2:', res.message || 'Unknown error');
                    setErrMessage(res.message )
                }
            }
        }
        catch (error: any) {
            setLoading(false)
            console.log('error server : ', error)
        }
    }

    return (
        <>
            <>
                <HeaderComponent>
                    <RowComponent justify='flex-start' styles={{ alignItems: 'center', flex: 1 }}>
                        <TouchableOpacity>
                            <Back size={22} color={appColor.black} />
                        </TouchableOpacity>
                    </RowComponent>
                </HeaderComponent>
                <Container isScroll styles={{ paddingTop: appInfo.sizes.HEIGHT * 0.02 }}>
                    <CardView>
                        <Image resizeMode='stretch' source={getImage.verification} style={{ width: appInfo.sizes.WIDTH * 0.3, height: appInfo.sizes.HEIGHT * 0.15 }} />
                    </CardView>

                    <SpaceComponent height={appInfo.sizes.HEIGHT * 0.02} />

                    <CardView>
                        <TextComponent text='Verify Code' flex={0} size={24} font={fontFamilies.semiBold} />
                    </CardView>

                    <SpaceComponent height={appInfo.sizes.HEIGHT * 0.03} />

                    <CardView styles={{ justifyContent: 'flex-start' }}>
                        <TextComponent text={`Check code in your Email`} flex={0} size={15} font={fontFamilies.semiBold} />
                    </CardView>

                    <SpaceComponent height={appInfo.sizes.HEIGHT * 0.008} />

                    <CardView styles={{ justifyContent: 'flex-start' }}>
                        <TextComponent text={`Code on -> `} flex={0} size={15} />
                        <TextComponent text={`${hideEmail(email)}`} flex={0} size={15} font={fontFamilies.semiBold} />
                    </CardView>

                    <SpaceComponent height={appInfo.sizes.HEIGHT * 0.008} />

                    <CardView styles={{ justifyContent: 'flex-start' }}>
                        <TextComponent text={`Remaining time `} flex={0} size={15} />
                        <TextComponent text={`${countdown}`} flex={0} size={15} font={fontFamilies.semiBold} />
                        <TextComponent text={` s  `} flex={0} size={15} />
                        {
                             (
                                <>
                                    <ArrowRight size={24} color='black' />
                                    <TextComponent text={'  Re-Send'} flex={0} size={15} font={fontFamilies.bold} color='blue'
                                        onPress={() => {
                                            handleReSend()
                                        }}
                                    />
                                </>
                            )
                        }
                    </CardView>

                    <SpaceComponent height={appInfo.sizes.HEIGHT * 0.05} />

                    <BoxView name='Pin Code View'>
                        <RowComponent justify="space-around" styles={{ paddingHorizontal: appInfo.sizes.WIDTH * 0.08 }}>
                            <TextInput
                                ref={input1Ref}
                                keyboardType="number-pad"
                                style={[localStyle.input]}
                                maxLength={1}
                                placeholder="-"
                                placeholderTextColor={appColor.gray}
                                selectionColor={'black'}
                                onChangeText={text => {
                                    text.length > 0 && input2Ref.current?.focus()
                                    text.length < 0 || !text.length && input1Ref.current?.focus()
                                    handleChangeValueCode(text, 0)

                                }}
                                value={codeValues.number1}
                            />
                            <TextInput
                                ref={input2Ref}
                                keyboardType="number-pad"
                                style={[localStyle.input]}
                                maxLength={1}
                                placeholder="-"
                                placeholderTextColor={appColor.gray}
                                selectionColor={'black'}
                                onChangeText={text => {
                                    text.length > 0 && input3Ref.current?.focus()
                                    text.length < 0 || !text.length && input1Ref.current?.focus()
                                    handleChangeValueCode(text, 1)
                                }}
                                value={codeValues.number2}
                            />
                            <TextInput
                                ref={input3Ref}
                                keyboardType="number-pad"
                                style={[localStyle.input]}
                                maxLength={1}
                                placeholder="-"
                                placeholderTextColor={appColor.gray}
                                selectionColor={'black'}
                                onChangeText={text => {
                                    text.length > 0 && input4Ref.current?.focus()
                                    text.length < 0 || !text.length && input2Ref.current?.focus()
                                    handleChangeValueCode(text, 2)
                                }}
                                value={codeValues.number3}
                            />
                            <TextInput
                                ref={input4Ref}
                                keyboardType="number-pad"
                                style={[localStyle.input]}
                                maxLength={1}
                                placeholder="-"
                                placeholderTextColor={appColor.gray}
                                selectionColor={'black'}
                                onChangeText={text => {
                                    text.length < 0 || !text.length && input3Ref.current?.focus()
                                    handleChangeValueCode(text, 3)
                                }}
                                value={codeValues.number4}
                            />
                        </RowComponent>
                    </BoxView>
                    <SpaceComponent height={appInfo.sizes.HEIGHT * 0.05} />


                    <BoxView styles={{ paddingHorizontal: appInfo.sizes.WIDTH * 0.08 }}>
                        <ButtonComponent
                            text='Continue'
                            onPress={() => handleContinue()}
                            type='primary'
                            textColor={appColor.white}
                            iconFlex='right'
                            icon={<ArrowSquareRight size={22} color={appColor.white} />}
                            paddingRightIcon={appInfo.sizes.WIDTH * 0.09}
                            textStyle={{ fontFamily: fontFamilies.bold }}
                        />
                    </BoxView>
                    <SpaceComponent height={20}/>
                    <CardView styles={{ justifyContent: 'center' }}>
                        {true && <TextComponent flex={0} text={errMessage} size={15} bold color={'red'} />}
                    </CardView>

                </Container>
            </>
            <Loading visible={loading} title='Loading ...' />
        </>
    );
};

export default VerificationScreen;

const localStyle = StyleSheet.create({
    input: {
        height: 55,
        width: 55,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: appColor.gray,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontFamily: fontFamilies.bold,
        textAlign: 'center',
        color: 'black'
    },
});
function setLoading(arg0: boolean) {
    throw new Error('Function not implemented.');
}

