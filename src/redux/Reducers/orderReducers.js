import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screen: 1,
  data:[]
};

const orderScreenSlice = createSlice({
  name: "orderScreen",
  initialState,
  reducers: {
    setOrderScreen: (state, action) => {
      state.screen = action.payload;
    },
    addItems: (state, action) => {
      state.data = action.payload;
    },
    resetScreen: (state) => {
      state.screen = 1;
    },
    removeItems: (state, action) => {
      state.data = [];
    },
  },
});

export const { setOrderScreen, addItems,resetScreen,removeItems } = orderScreenSlice.actions;

export default orderScreenSlice.reducer;
