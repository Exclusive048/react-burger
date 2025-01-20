import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from "../actions/constants";

import { getOrderReducer, initialState } from "./get-order";
import { errorMessage } from "../../utils/test-const";

describe('get-order reducer', () => {
    it("should return the initial state", () => {
        expect(
            getOrderReducer(undefined, {})).toEqual(initialState);
    });

    it("should set requestStart flag", () => {
        expect(getOrderReducer(
            initialState, 
            { 
                type: GET_ORDER_REQUEST 
            })
        ).toEqual({ 
            ...initialState, 
            orderRequest: true, 
            requestError: null 
        });
    });
    it("should get order", () => {
        const order = 777;
        expect(getOrderReducer(
            initialState, 
            { 
                type: GET_ORDER_SUCCESS, 
                order: order 
            })
            ).toEqual({ 
                ...initialState, 
                orderRequest: false, 
                requestError: null, 
                order: order 
        });
    });
    it("should set requestError message", () => {
        expect(getOrderReducer(
            initialState, 
            { 
                type: GET_ORDER_FAILED, 
                message: errorMessage 
            })
            ).toEqual({ 
                ...initialState, 
                orderRequest: false, 
                requestError: errorMessage, 
                order: null 
            });
    });
});