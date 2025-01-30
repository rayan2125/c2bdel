import { createSlice } from "@reduxjs/toolkit";



let initialState = {
    personalInfo: {},
    personalDoc: {},
    bankDetails: {},
    restoDetails: {},

}

const registrationForm = createSlice({
    name: 'registraition',
    initialState,
    reducers: {
        prsnlInfo(state, action) {
            state.personalInfo = action.payload
        },
        prsnlDoc(state, action) {
            state.personalDoc = action.payload
        },
        bnkDtls(state, action) {
            state.bankDetails = action.payload
        },
        restDtls(state, action) {
            state.restoDetails = action.payload
        },
    }
})

export const { prsnlInfo, prsnlDoc, bnkDtls, restDtls } = registrationForm.actions
export default registrationForm.reducer