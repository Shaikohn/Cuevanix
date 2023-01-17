import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "users",
    initialState: {
        allUsers: [],
        user: {},
        profile: {},
        orders: [],
    },
    reducers: {
        getUsers: (state, action) => {
            state.allUsers = action.payload
        },
        getUser: (state, action) => {
            state.user = action.payload
        },
        getProfile: (state, action) => {
            state.profile = action.payload
        },
        clearUser: (state) => {
            state.user = null
            localStorage.removeItem('profile')
        },
        clearUserDetails: (state) => {
            state.user = {}
        },
        getOrders: (state, action) => {
            state.orders = action.payload
        },
    }
})

export const { getUsers, getUser, getProfile, clearUser, clearUserDetails, getOrders } = userSlice.actions
export default userSlice.reducer