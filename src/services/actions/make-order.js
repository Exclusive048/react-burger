import { postRequest } from "../../utils/post-request";
import baseURL from "../../utils/base-url";
export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_FAILED = 'MAKE_ORDER_FAILED';
export const HIDE_ORDER_DETAIL = 'HIDE_ORDER_DETAIL';

const orderEndpoint = `${baseURL}/orders`;

export function makeOrder(ingredientsIds) {
    return function(dispatch) {
      dispatch({
        type: MAKE_ORDER_REQUEST
      });
      postRequest( orderEndpoint, {ingredients:ingredientsIds, }).then(res => {
        dispatch({
          type: MAKE_ORDER_SUCCESS,
          orderIdentifier: res.order.number
        });
      })
      .catch(() => {
        dispatch({ type: MAKE_ORDER_FAILED });
      });
    };
  }