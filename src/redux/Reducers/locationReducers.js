


import { createSlice } from "@reduxjs/toolkit";



const locationSlice = createSlice({
  name: "location",
  initialState: { 
    locationData: null,
},
  reducers: {
    addLocation: (state, action) => {

      state.locationData = action.payload;
    },
    removeLocation: (state, action) => {
      state.locationData = null
    },
   
  },
});

export const { addLocation, removeLocation,  } = locationSlice.actions;

export default locationSlice.reducer;
