import { createSlice } from "@reduxjs/toolkit";

export const inquirieSlice = createSlice({
    name: "inquiries",
    initialState: {
        inquiries: [],
        data: {},
    },
    reducers: {
        getInquiries: (state, action) => {
            state.inquiries = action.payload
        },
        getData: (state, action) => {
            state.data = action.payload
        },
    }
    }
)

export const { getInquiries, getData } = inquirieSlice.actions
export default inquirieSlice.reducer