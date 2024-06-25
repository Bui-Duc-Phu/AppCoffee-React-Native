
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface authState{
  id:string,email:string,token:string
}

const initialState : authState = {
  id :'',
  token : '',
  email:''
}

const authSlice = createSlice({
  name: 'auth',
  initialState:{
    authData:initialState
  },
  reducers: {
    addAuth:  (state,action) =>{
      state.authData = action.payload
    },

    removeAuth :(state,action) =>{
      state.authData = initialState

    }
  },
});
export const authReducer =  authSlice.reducer
export const { addAuth,removeAuth } = authSlice.actions;

export const  authSelector = (state:any) =>  state.authReducer.authData
