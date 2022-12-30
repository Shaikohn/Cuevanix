import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../slices/movieSlice";

export default configureStore({
    reducer: {
        movies: movieSlice,
    }
})