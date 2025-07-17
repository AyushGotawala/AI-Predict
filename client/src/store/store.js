import { configureStore } from "@reduxjs/toolkit";
import { signupReducer } from "./signUp";
import { loginReducer } from "./logIn";
import { emailReducer } from "./email";
import { emailHistoryReducer } from "./emailHistory";

const store = configureStore({
    reducer : {
        signup : signupReducer,
        login : loginReducer,
        email : emailReducer,
        emailHistory : emailHistoryReducer
    }
});

export default store;