import { createSlice } from "@reduxjs/toolkit";

export const inquirieSlice = createSlice({
    name: "inquiries",
    initialState: {
        inquiries: [],
        data: null,
    },
    reducers: {
        getInquiries: (state, action) => {
            state.inquiries = action.payload
        },
        getData: (state, action) => {
            state.data = action.payload
        },
        clearData: (state) => {
            state.data = null
        },
    }
    }
)

export const { getInquiries, getData, clearData } = inquirieSlice.actions
export default inquirieSlice.reducer