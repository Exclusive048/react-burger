import { getRequest } from '../../utils/get-request';
import { baseURL } from '../../utils/base-url';
import { AppDispatch } from '../store';
import { TOrderItem } from '../../utils/types/order';
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from './constants';
import { TGetOrderResponse } from '../../utils/types/order';


export interface IGetOrderRequest {
    type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccess {
    type: typeof GET_ORDER_SUCCESS;
    order: TOrderItem;
}

export interface IGetOrderFailed {
    type: typeof GET_ORDER_FAILED;
    message: string
}


export type TGetOrderActions = IGetOrderRequest | IGetOrderSuccess | IGetOrderFailed;

const getOrderRequest = (): IGetOrderRequest => ({ type: GET_ORDER_REQUEST })

const getOrderSuccess = (res: TGetOrderResponse): IGetOrderSuccess => ({
	type: GET_ORDER_SUCCESS,
	order: res.orders[0],
})

const getOrderFailed = (res: string): IGetOrderFailed => ({ type: GET_ORDER_FAILED, message: res })

export function getOrderAction(orderNr?: string) {
    return function(dispatch: AppDispatch) {
        dispatch(getOrderRequest());
        getRequest(`${baseURL}/orders/${orderNr}`)
        .then(result => {
            dispatch(getOrderSuccess(result));
        })
        .catch(err => {
            dispatch(getOrderFailed(err.message));
        });
    }
}