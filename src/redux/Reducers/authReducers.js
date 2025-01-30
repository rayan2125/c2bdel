import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'Auth',
    initialState: {
        isLoggedIn: false,
        authData: null,
    },
    reducers: {
        setAuthdata(state, action) {
            state.isLoggedIn = true;
            state.authData = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.authData = null;
        },
        
    },
});



export const { setAuthdata, logout, } = authSlice.actions;


export default authSlice.reducer;
