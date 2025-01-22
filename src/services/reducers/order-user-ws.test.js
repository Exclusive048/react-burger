import {
  ORDERS_USER_SUCCESS,
  ORDERS_USER_ERROR,
  ORDERS_USER_CLOSED,
  ORDERS_USER_MESSAGE,
} from "../actions/constants";
import { message, errorMessage } from "../../utils/test-const.ts";
import { ordersUserReducer, initialState } from "./order-user-ws";

describe("orders-user reducer", () => {
  it("should return the initial state", () => {
    expect(ordersUserReducer(undefined, {})).toEqual(initialState);
  });

  it("should set connected flag", () => {
    expect(
      ordersUserReducer(initialState, {
        type: ORDERS_USER_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      error: null,
      connected: true,
    });
  });

  it("should set error message", () => {
    expect(
      ordersUserReducer(initialState, {
        type: ORDERS_USER_ERROR,
        error: errorMessage,
      })
    ).toEqual({
      ...initialState,
      error: errorMessage,
    });
  });

  it("should reset connected flag", () => {
    expect(
      ordersUserReducer(initialState, {
        type: ORDERS_USER_CLOSED,
      })
    ).toEqual({
      ...initialState,
      error: null,
      connected: false,
    });
  });

  it("should get order-user message", () => {
    expect(
      ordersUserReducer(initialState, {
        type: ORDERS_USER_MESSAGE,
        message: message,
      })
    ).toEqual({
      ...initialState,
      error: null,
      message: message,
    });
  });
});
