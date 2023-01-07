import { createSlice } from "@reduxjs/toolkit";

const userFromLocalStorage = JSON.parse(localStorage.getItem('profile') || '{}')

export const userSlice = createSlice({
    name: "users",
    initialState: {
        allUsers: [],
        user: userFromLocalStorage
    },
    reducers: {
        getUsers: (state, action) => {
            state.allUsers = action.payload
        },
        getUser: (state, action) => {
            state.user = action.payload
        },
    }
})

export const { getUsers, getUser } = userSlice.actions
export default userSlice.reducer