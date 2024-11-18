import { MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_FAILED, HIDE_ORDER_DETAIL } from "../actions/make-order";

const initialState = {
    orderIdentifier: null,
    oderRequest: false,
    orderFailed: false
}

export const makeOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_ORDER_REQUEST: {
          return {
            ...state,
            orderRequest: true,
            orderFailed: false,
          };
        }
        case MAKE_ORDER_SUCCESS: {
          console.log("MAKE_ORDER_SUCCESS редьюсер, orderIdentifier:", action.orderIdentifier);
          return {
            ...state,
            orderIdentifier: action.orderIdentifier,
            orderRequest: false
          };
        }
        case MAKE_ORDER_FAILED: {
          return {
            ...state,
            orderFailed: true,
            orderRequest: false,
            orderIdentifier: null
          };
        }
        case HIDE_ORDER_DETAIL: {
          return {
              ...state,
              orderIdentifier: null,
          }
      }
        default: {
          return state;
      }
    }
}