import { createSlice } from "@reduxjs/toolkit";


const initialState={
    mImage:[],
    fssaiInfo:[],
    mPancardInfo:[],
}

const Merchant = createSlice({
name:'merchantInfo',
initialState,
reducers:{
    merchantImg(state,action){
        state.mImage=action.payload
    },
    fssaiImg(state,action){
        state.fssaiInfo=action.payload
    },
    mPan(state,action){
        state.mPancardInfo=action.payload
    },
    removemImg(state, action) {
        state.blankCheque = action.payload
    },
    removeFssai(state, action) {
        state.blankCheque = action.payload
    },
    removeMPan(state, action) {
        state.blankCheque = action.payload
    }
}
})