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

import { userReducer, initialState } from './user';
import { userRegisterResponse, userLoginResponse, getUserResponse, patchUserState, patchUserResponse } from '../../utils/test-const';

describe('user reducer', () => {
    it("should return the initial state", () => {
        expect(
            userReducer(undefined, {}))
            .toEqual(initialState);
    });

    it("should set request flags", () => {
        expect(userReducer(
            initialState, 
            { 
                type: LOGIN_REQUEST,
            })
            ).toEqual({ 
                ...initialState, 
                loginRequest: true
        });

        expect(userReducer(
            initialState, 
            { 
                type: REGISTER_REQUEST,
            })
            ).toEqual({ 
                ...initialState, 
                registerRequest: true
        });

        expect(userReducer(
            initialState, 
            { 
                type: LOGOUT_REQUEST,
            })
            ).toEqual({ 
                ...initialState, 
                logoutRequest: true
        });

        expect(userReducer(
            initialState, 
            { 
                type: GET_USER_REQUEST,
            })
            ).toEqual({ 
                ...initialState, 
                userRequest: true
        });

        expect(userReducer(
            initialState, 
            { 
                type: FORGOT_PASSWORD_REQUEST,
            })
            ).toEqual({ 
                ...initialState, 
                forgotPasswordRequest: true
        });

        expect(userReducer(
            initialState, 
            { 
                type: RESET_PASSWORD_REQUEST,
            })
            ).toEqual({ 
                ...initialState, 
                resetPasswordRequest: true
        });

        expect(userReducer(
            initialState, 
            { 
                type: PATCH_USER_REQUEST,
            })
            ).toEqual({ 
                ...initialState, 
                patchUserRequest: true
        });
    });

    it("should set requestFailed flags", () => {
        expect(userReducer(
            initialState, 
            { 
                type: LOGIN_FAILED,
            })
            ).toEqual({ 
                ...initialState, 
                loginRequest: false,
                loginFailed: true
        });

        expect(userReducer(
            initialState, 
            { 
                type: REGISTER_FAILED,
            })
            ).toEqual({ 
                ...initialState, 
                registerRequest: false,
                registerFailed: true
        });

        expect(userReducer(
            initialState, 
            { 
                type: LOGOUT_FAILED,
            })
            ).toEqual({ 
                ...initialState, 
                logoutRequest: false,
                logoutFailed: true,
        });

        expect(userReducer(
            initialState, 
            { 
                type: GET_USER_FAILED,
            })
            ).toEqual({ 
                ...initialState, 
                userRequest: false,
                userFailed: true,
        });

        expect(userReducer(
            initialState, 
            { 
                type: FORGOT_PASSWORD_FAILED,
            })
            ).toEqual({ 
                ...initialState, 
                forgotPasswordRequest: false,
                forgotPasswordFailed: true,
        });

        expect(userReducer(
            initialState, 
            { 
                type: RESET_PASSWORD_FAILED,
            })
            ).toEqual({ 
                ...initialState, 
                resetPasswordRequest: false,
                resetPasswordFailed: true,
        });

        expect(userReducer(
            initialState, 
            { 
                type: PATCH_USER_FAILED,
            })
            ).toEqual({ 
                ...initialState, 
                patchUserRequest: false,
                patchUserFailed: true,
        });
    });

    it("should set register success", () => {
        expect(userReducer(
            initialState, 
            { 
                type: REGISTER_SUCCESS, 
                payload: userRegisterResponse 
            })
            ).toEqual({ 
                ...initialState,
                registerRequest: false,
                user: userRegisterResponse.user,
                accessToken: userRegisterResponse.accessToken.split('Bearer ')[1],
                refreshToken: userRegisterResponse.refreshToken,
         });
    });

    it("should set login success", () => {
        expect(userReducer(
            initialState, 
            { 
                type: LOGIN_SUCCESS, 
                payload: userLoginResponse 
            })
            ).toEqual({ 
                ...initialState,
                loginRequest: false,
                isAuth: true,
                user: userLoginResponse.user,
                accessToken: userLoginResponse.accessToken.split('Bearer ')[1],
                refreshToken: userLoginResponse.refreshToken,
         });
    });

    it("should set logout success", () => {
        expect(userReducer(
            initialState, 
            { 
                type: LOGOUT_SUCCESS, 
            })
            ).toEqual({ 
                ...initialState,
         });
    });

    it("should set getUser success", () => {
        expect(userReducer(
            initialState, 
            { 
                type: GET_USER_SUCCESS, 
                payload: getUserResponse
            })
            ).toEqual({ 
                ...initialState,
                loginRequest: false,
                isAuth: true,
                user: getUserResponse.user,
         });
    });

    it("should set forgotPassword success", () => {
        expect(userReducer(
            initialState, 
            { 
                type: FORGOT_PASSWORD_SUCCESS, 
            })
            ).toEqual({ 
                ...initialState,
                forgotPasswordRequest: false,
                forgotPasswordSuccess: true,
         });
    });

    it("should set getUser success", () => {
        expect(userReducer(
            initialState, 
            { 
                type: GET_USER_SUCCESS, 
                payload: getUserResponse
            })
            ).toEqual({ 
                ...initialState,
                isAuth: true,
                user: getUserResponse.user,
         });
    });

 
    it("should set patchUser success", () => {
        expect(userReducer(
            patchUserState, 
            { 
                type: PATCH_USER_SUCCESS, 
                payload: patchUserResponse
            })
            ).toEqual({ 
                ...patchUserState,
                patchUserRequest: false,
                user: patchUserResponse.user,
         });
    });

});