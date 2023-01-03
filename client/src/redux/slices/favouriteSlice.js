import { createSlice } from "@reduxjs/toolkit";

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]')
const amountFromLocalStorage = JSON.parse(localStorage.getItem('amount') || '0')

const initialState = {
    favourites: cartFromLocalStorage,
    amount: amountFromLocalStorage,
}

const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        clearFavourites: (state) => {
            state.favourites = [];
            state.amount = 0;
        },
        addFavourite: (state, {payload}) => {
            const item = state.cartItems.find((i) => i._id === payload._id)
                if(item) {
                    console.log("Ya existe")
                } else {
                    state.cartItems.push(payload)
                    state.amount++
                }
        },
        removeFavourite: (state, {payload}) => {
            const itemId = payload
            state.cartItems = state.cartItems.filter(p => p._id !== itemId);
            state.amount--
        },
    }
})

export const {clearFavourites, removeFavourite,  addFavourite} = favouriteSlice.actions
export default favouriteSlice.reducer