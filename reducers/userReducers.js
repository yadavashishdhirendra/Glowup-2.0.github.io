import { createReducer } from "@reduxjs/toolkit";
const initialstate = {}

export const authReducer = createReducer(initialstate, {
    RegisterRequest: (state) => {
        state.loading = true
    },
    RegisterSuccess: (state, action) => {
        state.loading = false;
        state.hash = action.payload;
    },
    RegisterFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const verifyUser = createReducer(initialstate, {
    VerifyRequest: (state) => {
        state.loading = true
    },
    VerifySuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isRegister = true
    },
    VerifyFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const LoginUser = createReducer(initialstate, {
    LoginRequest: (state) => {
        state.loading = true
    },
    LoginSuccess: (state, action) => {
        state.loading = false;
        state.hash = action.payload;
        state.isAuthenticated = true
    },
    LoginFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const LoginVerifyUser = createReducer(initialstate, {
    LoginVerifyRequest: (state) => {
        state.loading = true
    },
    LoginVerifySuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    LoginVerifyFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const LoadUser = createReducer(initialstate, {
    LoadUserRequest: (state) => {
        state.loading = true
    },
    LoadUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true
    },
    LoadUserFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const LogoutUser = createReducer(initialstate, {
    LogoutUserRequest: (state) => {
        state.loading = true
    },
    LogoutUserSuccess: (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
    },
    LogoutUserFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const LoginUserDemo = createReducer(initialstate, {
    LogoutUserDemoRequest: (state) => {
        state.loading = true
    },
    LogoutUserDemoSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isAuthenticated = true;
    },
    LogoutUserDemoFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})