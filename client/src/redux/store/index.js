import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../slices/movieSlice";
import authSlice from "../slices/authSlice";

export default configureStore({
    reducer: {
        movies: movieSlice,
        auth: authSlice
    }
})