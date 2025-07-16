import { configureStore } from "@reduxjs/toolkit";
import { signupReducer } from "./signUp";
import { loginReducer } from "./logIn";
import { emailReducer } from "./email";

const store = configureStore({
    reducer : {
        signup : signupReducer,
        login : loginReducer,
        email : emailReducer
    }
});

export default store;