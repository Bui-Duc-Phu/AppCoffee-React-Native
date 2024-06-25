import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AuthNavigator from './AuthNavigator'
import MainNavigator from './MainNavigator'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authSelector } from '../redux/reducers/authReducer'

const AppRouter = () => {

    const { getItem} = useAsyncStorage("auth");
    const auth = useSelector(authSelector)
    const disPatch = useDispatch()

    console.log(auth)
    useEffect(()=>{
        checkLogin()
    },[])

    const checkLogin =  async() =>{
        const res:any = await getItem()

        disPatch(addAuth(JSON.parse(res)))
        // console.log('token loacl: ',JSON.parse(res).accesstoken)
    }


    return (
        <>
            {auth.accesstoken ? <MainNavigator /> : <AuthNavigator />}
        </>
    )
}

export default AppRouter