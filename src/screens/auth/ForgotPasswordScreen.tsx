import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../../components/HeaderComponent'
import { ButtonComponent, CardView, Container, InputComponent, RowComponent, SpaceComponent, TextComponent } from '../../components'
import { appColor } from '../../contasts/appColor'
import { ArrowSquareRight, Back, Sms } from 'iconsax-react-native'
import { appInfo } from '../../contasts/appInfo'
import { getImage } from '../../../assets/images'
import { globalStyles } from '../../styles/globalStyles'
import { fontFamilies } from '../../contasts/fontFamilies'
import { Loading, VerifiSuccessfull } from '../../modals'
import { isValidEmail } from '../../utils/isEmail'
import authenticationAPI from '../../networks/authAPi'
import { LogRespone } from '../../utils/LogRespone'

const ForgotPasswordScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [verifiSuccessfull, setVerifiSuccessfull] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [isShowErr, setIsShowErr] = useState(false);

    const handleContinue = async () => {
        setIsLoading(true)
        validate()
        if (!errMessage) {
            const res: any = await authenticationAPI.HandleAuthentication('/reset', {
                email: email
            }, 'patch')
            LogRespone(res);
            if (res && res.status === 200) {
                setIsLoading(false)
                setVerifiSuccessfull(true)
            } else {
                setIsLoading(false)
                LogRespone(res);
            }
        }
    }
    const validate = () => {
        if (!email) {
            setErrMessage('email is Required!')
            setIsShowErr(true)
        } else {
            if (isValidEmail(email)) {
                setErrMessage('')
                setIsShowErr(false)
            } else {
                setErrMessage('email is invalid!')
                setIsShowErr(true)
            }
        }
    }
    return (
        <>
            <>
                <HeaderComponent>
                    <RowComponent justify='space-around' styles={{ alignItems: 'center', flex: 1, }}>
                        <TouchableOpacity>
                            <Back size={22} color={appColor.black} />
                        </TouchableOpacity>
                        <TextComponent text='Reset Passwrod'
                            bold
                            flex={1}
                            styles={{ textAlign: 'center' }}
                        />
                        <Back size={22} color={'transparent'} />
                    </RowComponent>
                </HeaderComponent>
                <Container isScroll>
                    <SpaceComponent height={appInfo.sizes.HEIGHT * 0.07} />
                    <CardView>
                        <Image resizeMode='stretch' source={getImage.password} style={{ width: appInfo.sizes.WIDTH * 0.2, height: appInfo.sizes.HEIGHT * 0.1 }} />
                    </CardView>
                    <SpaceComponent height={appInfo.sizes.HEIGHT * 0.05} />
                    <CardView >
                        <TextComponent bold size={17} text='Please enter your email to reset the passwrod' flex={1} />
                    </CardView>
                    <SpaceComponent height={appInfo.sizes.HEIGHT * 0.04} />
                    <InputComponent
                        onChangeText={val => setEmail(val)}
                        alowClear
                        value={email}
                        styles={{ height: appInfo.sizes.WIDTH * 0.128 }}
                        hint='email'
                        onEnd={validate}
                        affix={<Sms size={22} color={appColor.gray} />}
                    />
                    <SpaceComponent height={appInfo.sizes.HEIGHT * 0.01} />
                    {
                        isShowErr && <TextComponent text={errMessage} size={14} color='red' styles={{ paddingStart: 10 }} />
                    }

                    <SpaceComponent height={appInfo.sizes.HEIGHT * 0.05} />
                    <ButtonComponent
                        text='Continue'
                        type={'primary'}
                        color={appColor.dodgerblue}
                        icon={<ArrowSquareRight
                            size="24"
                            color="white"
                        />}
                        iconFlex='right'
                        textColor='white'
                        paddingRightIcon={20}
                        onPress={handleContinue}
                        styles={{ marginHorizontal: appInfo.sizes.WIDTH * 0.14 }}
                    />
                </Container>
            </>
            <Loading visible={isLoading} />
            <VerifiSuccessfull
                visible={verifiSuccessfull}
                onPressLogin={() => { navigation.navigate('LoginScreen') }}
            />
        </>

    )
}

export default ForgotPasswordScreen