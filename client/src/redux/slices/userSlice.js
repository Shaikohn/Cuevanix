import { createSlice } from "@reduxjs/toolkit";

const userFromLocalStorage = JSON.parse(localStorage.getItem('profile') || null)

export const userSlice = createSlice({
    name: "users",
    initialState: {
        allUsers: [],
        user: userFromLocalStorage,
        profile: {}
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
    }
})

export const { getUsers, getUser, getProfile, clearUser } = userSlice.actions
export default userSlice.reducer