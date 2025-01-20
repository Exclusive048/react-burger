import { MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_FAILED } from "../actions/constants";
   
import { makeOrderReducer, initialState } from "./make-order";
import { errorMessage } from "../../utils/test-const";

describe('makeOrder reducer', () => {
    it("should return the initial state", () => {
        expect(
            makeOrderReducer(undefined, {}))
            .toEqual(initialState);
    });

    it("should set orderRequest flag", () => {
        expect(makeOrderReducer(
            initialState, 
            { 
                type: MAKE_ORDER_REQUEST 
            })
            ).toEqual({ 
                ...initialState, 
                orderRequest: true, 
                orderFailed: false 
            });
    });
    it("should set success order status", () => {
        const orderNr = 777;
        expect(makeOrderReducer(
            initialState, 
            { 
                type: MAKE_ORDER_SUCCESS, 
                order: orderNr 
            })
            ).toEqual({ 
                ...initialState, 
                orderRequest: false, 
                orderFailed: false, 
                order: orderNr 
            });
    });
    it("should set orderFailed flag", () => {
        expect(makeOrderReducer(
            initialState, 
            { 
                type: MAKE_ORDER_FAILED, 
                message: errorMessage 
            })
            ).toEqual({ 
                ...initialState, 
                orderRequest: false, 
                orderFailed: true, 
                order: null 
            });
    });
});
