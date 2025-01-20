import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
	REGISTER_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    PATCH_USER_REQUEST,
    PATCH_USER_SUCCESS,
    PATCH_USER_FAILED,
} from '../actions/constants';

import { TUser } from '../../utils/types/user';
import { TUserActions } from '../actions/user';

type TUserState = {
    registerRequest: boolean
	registerFailed: boolean
    accessToken: string
	refreshToken: string
    user: TUser | null
    loginRequest: boolean
	loginFailed: boolean
    userRequest: boolean
    userFailed: boolean
    logoutRequest: boolean
    logoutFailed: boolean
    forgotPasswordRequest: boolean
    forgotPasswordSuccess: boolean
	forgotPasswordFailed: boolean
    resetPasswordRequest: boolean
    resetPasswordSuccess: boolean
	resetPasswordFailed: boolean
    patchUserRequest: boolean
    patchUserFailed: boolean
    isAuth: boolean
}

export const initialState: TUserState = {
    registerRequest: false,
	registerFailed: false,
    accessToken: '',
	refreshToken: '',
    user: null,

    loginRequest: false,
	loginFailed: false,

    userRequest: false,
    userFailed: false,

    logoutRequest: false,
	logoutFailed: false,

    forgotPasswordRequest: false,
    forgotPasswordSuccess: false,
    forgotPasswordFailed: false,

    resetPasswordRequest: false,
	resetPasswordFailed: false,
	resetPasswordSuccess: false,

    patchUserRequest: false,
    patchUserFailed: false,

    isAuth: false,
}


export const userReducer = (state = initialState, action: TUserActions) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return { ...state, registerRequest: true };

        case REGISTER_SUCCESS:
            return {
                ...state,
                registerRequest: false,
                user: action.payload.user,
				accessToken: action.payload.accessToken.split('Bearer ')[1],
				refreshToken: action.payload.refreshToken,
            }
        case REGISTER_FAILED:
            return { ...state, registerRequest: false, registerFailed: true }
        
        case LOGIN_REQUEST:
            return { ...state, loginRequest: true }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginRequest: false,
                loginFailed: false,
                user: action.payload.user,
                accessToken: action.payload.accessToken.split('Bearer ')[1],
                refreshToken: action.payload.refreshToken,
                isAuth: true,
            }
        case LOGIN_FAILED:
            return { ...state, loginRequest: false, loginFailed: true }

        case LOGOUT_REQUEST:
            return { ...state, logoutRequest: true }
        case LOGOUT_SUCCESS:
            return initialState
        case LOGOUT_FAILED:
            return { ...state, logoutRequest: false, logoutFailed: true }

        case GET_USER_REQUEST:
            return { ...state, userRequest: true }
        case GET_USER_SUCCESS:
            return {
                ...state,
                userRequest: false,
                user: action.payload.user,
                isAuth: true
            }
        case GET_USER_FAILED:
            return { ...state, userRequest: false, userFailed: true }

        case FORGOT_PASSWORD_REQUEST:
            return { ...state, forgotPasswordRequest: true }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordSuccess: true,
            }
        case FORGOT_PASSWORD_FAILED:
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordFailed: true,
                forgotPasswordSuccess: false,
            }

        case RESET_PASSWORD_REQUEST:
            return { ...state, resetPasswordRequest: true }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordSuccess: true,
                resetPasswordRequest: false,
                forgotPasswordSuccess: false,   
            }
        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordSuccess: false,
                resetPasswordFailed: true,
            }

        case PATCH_USER_REQUEST:
            return { ...state, patchUserRequest: true }
        case PATCH_USER_SUCCESS:
            return { ...state, patchUserRequest: false, user: action.payload.user }
        case PATCH_USER_FAILED:
            return { ...state, patchUserRequest: false, patchUserFailed: true }
        default:
            return state
    }
}