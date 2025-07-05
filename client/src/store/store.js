import { configureStore } from "@reduxjs/toolkit";
import { signupReducer } from "./signUp";
import { loginReducer } from "./logIn";

const store = configureStore({
    reducer : {
        signup: signupReducer,
        login : loginReducer
    }
});

export default store;