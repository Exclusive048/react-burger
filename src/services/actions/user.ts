import { postRequest } from "../../utils/post-request";
import { requestWithToken } from "../../utils/request-with-token";
import { refreshToken } from "../../utils/refresh-token";
import { baseURL } from "../../utils/base-url";
import { deleteCookie, setCookie, getCookie } from '../../utils/cookie'
import { TAuthResponse, TLoginUser, TRegisterUser, TUserResponse, TPassword } from "../../utils/types/user";
import { AppDispatch } from "../store";

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
} from './constants'

interface IRegisterRequest {
	readonly type: typeof REGISTER_REQUEST
}

interface IRegisterSuccess {
	readonly type: typeof REGISTER_SUCCESS
	payload: TAuthResponse
}

interface IRegisterFailed {
	readonly type: typeof REGISTER_FAILED
}

interface ILoginRequest {
	readonly type: typeof LOGIN_REQUEST
}

interface ILoginSuccess {
	readonly type: typeof LOGIN_SUCCESS
	readonly payload: TAuthResponse
}

interface ILoginFailed {
	readonly type: typeof LOGIN_FAILED
}

interface ILogoutRequest {
	readonly type: typeof LOGOUT_REQUEST
}

interface ILogoutSuccess {
	readonly type: typeof LOGOUT_SUCCESS
}

interface ILogoutFailed {
	readonly type: typeof LOGOUT_FAILED
}

interface IGetUserRequest {
	readonly type: typeof GET_USER_REQUEST
}

interface IGetUserSuccess {
	readonly type: typeof GET_USER_SUCCESS
	payload: TUserResponse
}

interface IGetUserFailed {
	readonly type: typeof GET_USER_FAILED
}

interface IForgotPasswordRequest {
	readonly type: typeof FORGOT_PASSWORD_REQUEST
}

interface IForgotPasswordSuccess {
	readonly type: typeof FORGOT_PASSWORD_SUCCESS
}

interface IForgotPasswordFailed {
	readonly type: typeof FORGOT_PASSWORD_FAILED
}

interface IResetPasswordRequest {
	readonly type: typeof RESET_PASSWORD_REQUEST
}

interface IResetPasswordSuccess {
	readonly type: typeof RESET_PASSWORD_SUCCESS
}

interface IResetPasswordFailed {
	readonly type: typeof RESET_PASSWORD_FAILED
}

interface IPatchUserRequest {
	readonly type: typeof PATCH_USER_REQUEST
}

interface IPatchUserSuccess {
	readonly type: typeof PATCH_USER_SUCCESS
	readonly payload: TUserResponse
}

interface IPatchUserFailed {
	readonly type: typeof PATCH_USER_FAILED
}

export type TUserActions =
	| IRegisterRequest
	| IRegisterSuccess
	| IRegisterFailed
	| ILoginRequest
	| ILoginSuccess
	| ILoginFailed
	| ILogoutRequest
	| ILogoutSuccess
	| ILogoutFailed
	| IGetUserRequest
	| IGetUserSuccess
	| IGetUserFailed
	| IForgotPasswordRequest
	| IForgotPasswordSuccess
	| IForgotPasswordFailed
	| IResetPasswordRequest
	| IResetPasswordSuccess
	| IResetPasswordFailed
	| IPatchUserRequest
	| IPatchUserSuccess
	| IPatchUserFailed


const registerRequest = (): IRegisterRequest => ({
	type: REGISTER_REQUEST,
})

const registerSuccess = (res: TAuthResponse): IRegisterSuccess => ({
	type: REGISTER_SUCCESS,
	payload: res,
})

const registerFailed = (): IRegisterFailed => ({
	type: REGISTER_FAILED,
})

const loginRequest = (): ILoginRequest => ({
	type: LOGIN_REQUEST,
})

const loginSuccess = (res: TAuthResponse): ILoginSuccess => ({
	type: LOGIN_SUCCESS,
	payload: res,
})

const loginFailed = (): ILoginFailed => ({
	type: LOGIN_FAILED,
})

const logoutRequest = (): ILogoutRequest => ({
	type: LOGOUT_REQUEST,
})

const logoutSuccess = (): ILogoutSuccess => ({
	type: LOGOUT_SUCCESS,
})

const logoutFailed = (): ILogoutFailed => ({
	type: LOGOUT_FAILED,
})

const getUseraRequest = (): IGetUserRequest => ({
	type: GET_USER_REQUEST,
})

const getUserSuccess = (res: TUserResponse): IGetUserSuccess => ({
	type: GET_USER_SUCCESS,
	payload: res,
})

const getUserFailed = (): IGetUserFailed => ({
	type: GET_USER_FAILED,
})

const forgotPasswordRequest = (): IForgotPasswordRequest => ({
	type: FORGOT_PASSWORD_REQUEST,
})

const forgotPasswordSuccess = (): IForgotPasswordSuccess => ({
	type: FORGOT_PASSWORD_SUCCESS,
})

const forgotPasswordFailed = (): IForgotPasswordFailed => ({
	type: FORGOT_PASSWORD_FAILED,
})

const resetPasswordRequest = (): IResetPasswordRequest => ({
	type: RESET_PASSWORD_REQUEST,
})

const resetPasswordSuccess = (): IResetPasswordSuccess => ({
	type: RESET_PASSWORD_SUCCESS,
})

const resetPasswordFailed = (): IResetPasswordFailed => ({
	type: RESET_PASSWORD_FAILED,
})

const patchUserRequest = (): IPatchUserRequest => ({
	type: PATCH_USER_REQUEST,
})

const patchUserSuccess = (res: TUserResponse): IPatchUserSuccess => ({
	type: PATCH_USER_SUCCESS,
	payload: res,
})

const patchUserFailed = (): IPatchUserFailed => ({
	type: PATCH_USER_FAILED,
})


const registerEndpoint: string = `${baseURL}/auth/register`;
const loginEndpoint: string = `${baseURL}/auth/login`;
const userEndpoint: string = `${baseURL}/auth/user`;
const logoutEndpoint: string = `${baseURL}/auth/logout`;
const passwordForgotEndpoint: string = `${baseURL}/password-reset`;
const passwordResetEndpoint: string = `${baseURL}/password-reset/reset`;


export function register(user: TRegisterUser) {
	return function (dispatch: AppDispatch) {
		dispatch(registerRequest())
		postRequest<TAuthResponse>(registerEndpoint,
            {
                email: user.email,
                password: user.password,
                name: user.name,
            })
			.then(res => {
				dispatch(registerSuccess(res))
			})
			.catch(() => {
				dispatch(registerFailed())
			})
	}
}

export function login(user: TLoginUser) {
    return function (dispatch: AppDispatch) {
        dispatch(loginRequest());
        postRequest<TAuthResponse>(loginEndpoint, {
            email: user.email,
            password: user.password,
        })
            .then((res) => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                setCookie('accessToken', accessToken); 
                setCookie('refreshToken', res.refreshToken);
                dispatch(loginSuccess(res));
                dispatch(getUser());
            })
            .catch(() => {
                dispatch(loginFailed());
            });
    };
}


export function getUser() {
    return function (dispatch: AppDispatch) {
        dispatch(getUseraRequest());
        const token = getCookie('accessToken');
        if (!token) {
            console.error("No token found for getUser");
            dispatch(getUserFailed());
            return;
        }

        requestWithToken<TUserResponse>(userEndpoint, "GET", {})
            .then((res) => {
                dispatch(getUserSuccess(res));
            })
            .catch(async (err) => {
                if (err.message === "Unauthorized") {
                    try {
                        const newToken = await refreshToken(); // Обновляем токен
                        return getUser()(dispatch); // Повторяем запрос
                    } catch (refreshErr) {
                        console.error("Unable to refresh token for getUser", refreshErr);
                        dispatch(getUserFailed());
                    }
                } else {
                    dispatch(getUserFailed());
                }
            });
    };
}


export function logout() {
	return function (dispatch: AppDispatch) {
		dispatch(logoutRequest())
		postRequest(logoutEndpoint, 
            { token: getCookie('refreshToken') })
			.then(() => {
				dispatch(logoutSuccess())
				deleteCookie('accessToken')
				deleteCookie('refreshToken')
			})
			.catch(() => {
				dispatch(logoutFailed())
			})
	}
}

export function forgotPassword(email: string) {
	return function (dispatch: AppDispatch) {
		dispatch(forgotPasswordRequest())
		postRequest(passwordForgotEndpoint, { email: email })
			.then(() => {
				dispatch(forgotPasswordSuccess())
			})
			.catch(() => {
				dispatch(forgotPasswordFailed())
			})
	}
}

export function resetPassword(password: TPassword) {
	return function (dispatch: AppDispatch) {
		dispatch(resetPasswordRequest())
		postRequest( passwordResetEndpoint, {
			password: password.password,
			token: password.token,
		})
			.then(() => {
				dispatch(resetPasswordSuccess())
			})
			.catch(() => {
				dispatch(resetPasswordFailed())
			})
	}
}

export const patchUser = (name: string, email: string, password: string) => {
	return function (dispatch: AppDispatch) {
		dispatch(patchUserRequest())
		requestWithToken<TUserResponse>(userEndpoint, "PATCH", {name:name, email:email, password:password})
		.then(res => {
			console.log(res)
			dispatch(patchUserSuccess(res))
		})
		.catch(() => dispatch(patchUserFailed()))
	}
}