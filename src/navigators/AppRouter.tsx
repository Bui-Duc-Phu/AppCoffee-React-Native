import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthNavigator from './AuthNavigator'
import MainNavigator from './MainNavigator'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authSelector } from '../redux/reducers/authReducer'
import { LogRespone } from '../utils/LogRespone'
import { SplashScreen } from '../screens'

const AppRouter = () => {

    const { getItem} = useAsyncStorage("auth");
    const auth = useSelector(authSelector)
    const disPatch = useDispatch()

    const [isShowSplash, setIsShowSplash] = useState(true);

   




    useEffect(() => {
        checkLogin()
        const timeout = setTimeout(() => {
          setIsShowSplash(false);
        }, 1500);
        return () => clearTimeout(timeout);
    }, []);
    
    

    const checkLogin =  async() =>{
        const res:any = await getItem()
        disPatch(addAuth(JSON.parse(res)))
    }

    
    return (
        <>
            { isShowSplash? <SplashScreen/> :    auth.accesstoken ? <MainNavigator /> : <AuthNavigator />}
        </>
    )
}

export default AppRouter