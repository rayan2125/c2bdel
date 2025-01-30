

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fadharInfo: [],
    badharInfo: [],
    panInfo: [],
    chequeInfo: [],
    mImage: [],
    fssaiInfo: [],
    mPancardInfo: [],

};

const personalInfoRdc = createSlice({
    name: "prnInfomation",
    initialState,
    reducers: {
        fadharCard(state, action) {
            state.fadharInfo = action.payload
        },
        badharCard(state, action) {
            state.badharInfo = action.payload
        },
        panCard(state, action) {
            state.panInfo = action.payload
        },
        blankCheque(state, action) {
            state.chequeInfo = action.payload
        },
        merchantImg(state, action) {
            state.mImage = action.payload
        },
        fssaiImg(state, action) {
            state.fssaiInfo = action.payload
        },
        mPan(state, action) {
            state.mPancardInfo = action.payload
        },
        removefadhar(state, action) {
            state.fadharInfo = action.payload
        },
        removebadhar(state, action) {
            state.badharInfo = action.payload
        },
        removepan(state, action) {
            state.panInfo = action.payload
        },
        removecheque(state, action) {
            state.chequeInfo = action.payload
        },
        removemImg(state, action) {
            state.mImage = action.payload
        },
        removeFssai(state, action) {
            state.fssaiInfo = action.payload
        },
        removeMPan(state, action) {
            state.mPancardInfo = action.payload
        }
    },
});




export const { fadharCard, badharCard, panCard, blankCheque, merchantImg, fssaiImg, mPan, removebadhar, removepan, removefadhar, removecheque, removeFssai, removeMPan, removemImg } = personalInfoRdc.actions;

export default personalInfoRdc.reducer;
