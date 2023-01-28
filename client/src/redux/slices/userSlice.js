import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "users",
    initialState: {
        allUsers: [],
        filteredUsers: [],
        user: null,
        profile: null,
        orders: [],
    },
    reducers: {
        getUsers: (state, action) => {
            state.allUsers = action.payload
            state.filteredUsers = action.payload
        },
        getUser: (state, action) => {
            state.user = action.payload
        },
        getProfile: (state, action) => {
            state.profile = action.payload
        },
        userByName: (state, action) => {
            const all  = state.allUsers
            const orderUsersName = action.payload === "name_asc" ?
                state.filteredUsers.slice().sort(function(a, b) {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) {return -1}
                    if(b.name.toLowerCase() < a.name.toLowerCase()) {return 1}
                    return 0;
                }) : 
                state.filteredUsers.slice().sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {return -1}
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {return 1}
                    return 0;
        })
        const orderAllUsersName = action.payload === "name_asc" ?
                state.allUsers.slice().sort(function(a, b) {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) {return -1}
                    if(b.name.toLowerCase() < a.name.toLowerCase()) {return 1}
                    return 0;
                }) : 
                state.allUsers.slice().sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {return -1}
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {return 1}
                    return 0;
        })
        return {
            ...state,
            allUsers: orderAllUsersName,
            filteredUsers: orderUsersName
        }
        },
        orderByUsername: (state, action) => {
            const orderUsersName = action.payload === "name_asc" ?
                state.orders.slice().sort(function(a, b) {
                    if(a.userName.toLowerCase() < b.userName.toLowerCase()) {return -1}
                    if(b.userName.toLowerCase() < a.userName.toLowerCase()) {return 1}
                    return 0;
                }) : 
                state.orders.slice().sort(function(a, b) {
                    if(a.userName.toLowerCase() > b.userName.toLowerCase()) {return -1}
                    if(a.userName.toLowerCase() > b.userName.toLowerCase()) {return 1}
                    return 0;
        })
        return {
            ...state,
            orders: orderUsersName
        }
        },
        filterUserRole: (state, action) => {
            const usersFilter = state.allUsers
            const adminsFilter = state.allUsers
            return {
                ...state,
                filteredUsers: action.payload === "All" ? state.allUsers : action.payload === 'Users' ? usersFilter.filter(u => u.admin === false && u.owner === false) : adminsFilter.filter(u => u.admin === true || u.owner === true)
            }
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

export const { getUsers, getUser, getProfile, userByName, orderByUsername, filterUserRole, clearUser, clearUserDetails, getOrders } = userSlice.actions
export default userSlice.reducer