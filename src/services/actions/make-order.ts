import { baseURL } from "../../utils/base-url";
import { MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_FAILED, HIDE_ORDER_DETAIL } from "./constants";
import { AppDispatch } from "../store";
import { TOrder, TOrderResponse } from "../../utils/types/order";
import { requestWithToken } from "../../utils/request-with-token";

interface IMakeOrderRequest {
	readonly type: typeof MAKE_ORDER_REQUEST
}

interface IMakeOrderSuccess {
	readonly type: typeof MAKE_ORDER_SUCCESS
	readonly order: TOrder
}

interface IMakeOrderFailed {
	readonly type: typeof MAKE_ORDER_FAILED
}

interface IHideOrderDetail {
  readonly type: typeof HIDE_ORDER_DETAIL
}

export type TMakeOrderActions = 
	| IMakeOrderRequest
	| IMakeOrderSuccess
	| IMakeOrderFailed
	| IHideOrderDetail

const makeOrderRequest = (): IMakeOrderRequest => ({ type: MAKE_ORDER_REQUEST })

const makeOrderSuccess = (res: TOrderResponse): IMakeOrderSuccess => ({
	type: MAKE_ORDER_SUCCESS,
	order: { name: res.name, order: res.order },
})

const makeOrderFailed = (): IMakeOrderFailed => ({
	type: MAKE_ORDER_FAILED,
})

export const hideOrderDetail = (): IHideOrderDetail => ({
  type: HIDE_ORDER_DETAIL
})

const orderEndpoint: string = `${baseURL}/orders`;

export function makeOrder(ingredientsIds: Array<string>) {
    return function(dispatch: AppDispatch) {
      dispatch(makeOrderRequest());
      requestWithToken<TOrderResponse>(orderEndpoint, "POST", {ingredients:ingredientsIds, })
      .then(res => {
        dispatch( makeOrderSuccess(res));
      })
      .catch(() => {
        dispatch(makeOrderFailed());
      });
    };
  }