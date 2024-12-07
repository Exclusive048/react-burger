import { postRequest } from "../../utils/post-request";
import { requestWithToken } from "../../utils/request-with-token";
import baseURL from "../../utils/base-url";
import { deleteCookie, setCookie, getCookie } from "../../utils/cookie";
import { checkResponse } from "../../utils/check-response";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const PATCH_USER_REQUEST = "PATCH_USER_REQUEST";
export const PATCH_USER_SUCCESS = "PATCH_USER_SUCCESS";
export const PATCH_USER_FAILED = "PATCH_USER_FAILED";

const registerEndpoint = `${baseURL}/auth/register`;
const loginEndpoint = `${baseURL}/auth/login`;
const userEndpoint = `${baseURL}/auth/user`;
const logoutEndpoint = `${baseURL}/auth/logout`;
const passwordForgotEndpoint = `${baseURL}/password-reset`;
const passwordResetEndpoint = `${baseURL}/password-reset/reset`;

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + getCookie("accessToken"),
};

const resetTokenEndpoint = `${baseURL}/auth/token`;

export function register(user) {
  return function (dispatch) {
    dispatch({ type: REGISTER_REQUEST });
    postRequest(registerEndpoint, {
      email: user.email,
      password: user.password,
      name: user.name,
    })
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res,
        });
      })
      .catch(() => {
        dispatch({ type: REGISTER_FAILED });
      });
  };
}

export function login(user) {
  return function (dispatch) {
    dispatch({ type: LOGIN_REQUEST });
    postRequest(loginEndpoint, {
      email: user.email,
      password: user.password,
    })
      .then((res) => {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res,
        });
      })
      .catch(() => {
        dispatch({ type: LOGIN_FAILED });
      });
  };
}

export function getUser() {
  return function (dispatch) {
    dispatch({ type: GET_USER_REQUEST });
    requestWithToken(userEndpoint, "GET")
      .then((res) => {
        console.log(res);
        dispatch({
          type: GET_USER_SUCCESS,
          payload: res,
        });
      })
      .catch(() => {
        dispatch({ type: GET_USER_FAILED });
      });
  };
}

export function logout() {
  return function (dispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    postRequest(logoutEndpoint, { token: getCookie("refreshToken") })
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      })
      .catch(() => {
        dispatch({ type: LOGOUT_FAILED });
      });
  };
}

export function forgotPassword(email) {
  return function (dispatch) {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    postRequest(passwordForgotEndpoint, { email: email })
      .then(() => {
        dispatch({ type: FORGOT_PASSWORD_SUCCESS });
      })
      .catch(() => {
        dispatch({ type: FORGOT_PASSWORD_FAILED });
      });
  };
}

export function resetPassword(password) {
  return function (dispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    postRequest(passwordResetEndpoint, {
      password: password.password,
      token: password.token,
    })
      .then(() => {
        dispatch({ type: RESET_PASSWORD_SUCCESS });
      })
      .catch(() => {
        dispatch({ type: RESET_PASSWORD_FAILED });
      });
  };
}

export const patchUser = (name, email, password) => {
  return function (dispatch) {
    dispatch({ type: PATCH_USER_REQUEST });
    try {
      fetch(userEndpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("accessToken"),
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
      })
        .then(checkResponse)
        .then((res) => {
          dispatch({
            type: PATCH_USER_SUCCESS,
            payload: res,
          });
        });
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = postRequest(resetTokenEndpoint);
        setCookie("accessToken", refreshData.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", refreshData.refreshToken);
        headers.headers.Authorization = refreshData.accessToken;
        fetch(userEndpoint, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("accessToken"),
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }).then(checkResponse);
      } else {
        Promise.reject(err);
        dispatch({ type: PATCH_USER_FAILED });
      }
    }
  };
};
