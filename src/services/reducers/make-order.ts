import { TOrder } from "../../utils/types/order";
import { MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_FAILED, HIDE_ORDER_DETAIL } from "../actions/constants";
import { TMakeOrderActions } from "../actions/make-order";

export type TMakeOrderState = {
	orderRequest: boolean
	orderFailed: boolean
  order: TOrder
}
const initialState: TMakeOrderState = {
    order: null,
    orderRequest: false,
    orderFailed: false
}

export const makeOrderReducer = (state = initialState, action: TMakeOrderActions) => {
    switch (action.type) {
        case MAKE_ORDER_REQUEST: {
          return {
            ...state,
            orderRequest: true,
            orderFailed: false,
          };
        }
        case MAKE_ORDER_SUCCESS: {
          return {
            ...state,
            order: action.order,
            orderRequest: false,
            orderFailed: false
          };
        }
        case MAKE_ORDER_FAILED: {
          return {
            ...state,
            orderFailed: true,
            orderRequest: false,
            order: null
          };
        }
        case HIDE_ORDER_DETAIL: {
          return {
              ...state,
              order: null,
          }
      }
        default: {
          return state;
      }
    }
}