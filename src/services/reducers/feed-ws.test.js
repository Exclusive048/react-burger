import {
  ORDERS_ALL_MESSAGE,
  ORDERS_ALL_SUCCESS,
  ORDERS_ALL_ERROR,
  ORDERS_ALL_CLOSED,
} from "../actions/constants";
import { ordersAllReducer, initialState } from "./feed-ws";
import { message, errorMessage } from "../../utils/test-const.ts";

describe("ordersAll reducer", () => {
  it("should return the initial state", () => {
    expect(ordersAllReducer(undefined, {})).toEqual(initialState);
  });

  it("should set connected flag", () => {
    expect(
      ordersAllReducer(initialState, {
        type: ORDERS_ALL_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      error: null,
      connected: true,
    });
  });

  it("should set error", () => {
    expect(
      ordersAllReducer(initialState, {
        type: ORDERS_ALL_ERROR,
        error: errorMessage,
      })
    ).toEqual({
      ...initialState,
      error: errorMessage,
    });
  });

  it("should reset connected flag", () => {
    expect(
      ordersAllReducer(initialState, {
        type: ORDERS_ALL_CLOSED,
      })
    ).toEqual({
      ...initialState,
      error: null,
      connected: false,
    });
  });

  it("should get message", () => {
    expect(
      ordersAllReducer(initialState, {
        type: ORDERS_ALL_MESSAGE,
        message: message,
      })
    ).toEqual({
      ...initialState,
      error: null,
      message: message,
    });
  });
});
