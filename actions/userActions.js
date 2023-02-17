import axios from "axios";
import { API } from "../config/config";

export const registerUser = (name, phone) => async (dispatch) => {
    try {
        dispatch({
            type: 'RegisterRequest'
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post(`${API}/customer/register`, { name, phone }, config)
        dispatch({
            type: 'RegisterSuccess',
            payload: data.hash
        })
    } catch (error) {
        dispatch({
            type: 'RegisterFail',
            payload: error.response.data.message
        })

    }
}

export const VerifyRegisterUser = (name, phone, hash, otp) => async (dispatch) => {
    try {
        dispatch({
            type: 'VerifyRequest'
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post(`${API}/verify/otp`, { name, phone, hash, otp }, config)
        dispatch({
            type: 'VerifySuccess',
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: 'VerifyFail',
            payload: error.response.data.message
        })

    }
}


export const LoginUser = (phone) => async (dispatch) => {
    try {
        dispatch({
            type: 'LoginRequest'
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post(`${API}/customer/login`, { phone }, config)
        dispatch({
            type: 'LoginSuccess',
            payload: data.hash
        })
    } catch (error) {
        dispatch({
            type: 'LoginFail',
            payload: error.response.data.message
        })

    }
}

export const VerifyLoginUser = (phone, hash, otp) => async (dispatch) => {
    try {
        dispatch({
            type: 'LoginVerifyRequest'
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post(`${API}/login/verify/otp`, { phone, hash, otp }, config)
        dispatch({
            type: 'LoginVerifySuccess',
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: 'LoginVerifyFail',
            payload: error.response.data.message
        })

    }
}


export const LoadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'LoadUserRequest'
        })

        const { data } = await axios.get(`${API}/customer/user/me`)
        dispatch({
            type: 'LoadUserSuccess',
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: 'LoadUserFail',
            payload: error.response.data.message
        })

    }
}

// LOGOUT USER ACTION
export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'LogoutUserRequest'
        })
        await axios.get(`${API}/customer/user/logout`)
        dispatch({
            type: 'LogoutUserSuccess',
        })
    } catch (error) {
        dispatch({
            type: 'LogoutUserFail',
            payload: error.response.data.message
        })
    }
}

export const LoginUserDemos = (phone, otp) => async (dispatch) => {
    try {
        dispatch({
            type: 'LogoutUserDemoRequest'
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post(`${API}/customer/login/demo`, { phone, otp }, config)
        dispatch({
            type: 'LogoutUserDemoSuccess',
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: 'LogoutUserDemoFail',
            payload: error.response.data.message
        })

    }
}