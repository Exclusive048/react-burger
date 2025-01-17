import { TOrderItem } from '../../utils/types/order';
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from '../actions/constants';
import { TGetOrderActions } from '../actions/get-order';

type TGetOrderState = {
    orderRequest: boolean;
    requestError: string | null;
    order: TOrderItem | null;
}

const initialState : TGetOrderState = {
    orderRequest: false,
    requestError: null,
    order: null
}

export function getOrderReducer(state = initialState, action: TGetOrderActions): TGetOrderState {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return { ...state, orderRequest: true, requestError: null };
        case GET_ORDER_SUCCESS:
            return { ...state, orderRequest: false, requestError: null, order: action.order };
        case GET_ORDER_FAILED:
            return { ...state, orderRequest: false, requestError: action.message, order: null };
            
        default:
            return state;
    }
}