import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    subcriptionPlans: []
}

const createSubcriptionPlan = createSlice({
    name: "SubcriptionPlan",
    initialState,
    reducers: {
        addSubcription(state, action) {
            state.subcriptionPlans.push(action.payload);
        },
        removeAllSubcriptions(state) {
            state.subcriptionPlans = [];
        }
    }
})

export const { addSubcription, removeAllSubcriptions } = createSubcriptionPlan.actions
export default createSubcriptionPlan.reducer
