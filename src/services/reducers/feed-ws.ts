import { TOrdersList } from '../../utils/types/order';
import { ORDERS_ALL_SUCCESS, ORDERS_ALL_ERROR, ORDERS_ALL_CLOSED, ORDERS_ALL_MESSAGE } from '../actions/constants';
import { TOrdersAllActions } from '../actions/feed-ws';

type TOrdersAllState = {
    connected: boolean;
    message: TOrdersList | null;
    error: string | null;
};

export const initialState: TOrdersAllState = {
    connected: false,
    message: null,
    error: null
};

export function ordersAllReducer(state = initialState, action: TOrdersAllActions): TOrdersAllState {
    switch (action.type) {
        case ORDERS_ALL_SUCCESS:
            return { ...state, error: null, connected: true };
        case ORDERS_ALL_ERROR:
            return { ...state, error: action.error, connected: false };
        case ORDERS_ALL_CLOSED:
            return { ...state, error: null, connected: false };
        case ORDERS_ALL_MESSAGE:
            return { ...state, error: null, message: action.message };
        default:
            return state;
    }
}