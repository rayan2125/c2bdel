import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imgUrl: []
}

const imageUrl = createSlice({
    name: 'Imagesurl',
    initialState,
    reducers: {
        addUrl(state, action) {
            state.imgUrl = action.payload
        }
    }
})

export const { addUrl } = imageUrl.actions
export default imageUrl.reducer 
