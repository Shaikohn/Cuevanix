import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../slices/movieSlice";
import authSlice from "../slices/authSlice";
import userSlice from "../slices/userSlice";

export default configureStore({
    reducer: {
        movies: movieSlice,
        auth: authSlice,
        user: userSlice,
    }
})