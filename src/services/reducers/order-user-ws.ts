import { TOrdersList } from '../../utils/types/order';
import { ORDERS_USER_SUCCESS, ORDERS_USER_ERROR, ORDERS_USER_CLOSED, ORDERS_USER_MESSAGE } from '../actions/constants';
import { TOrdersUserActions } from '../actions/order-user-ws';

type TOrdersUserState = {
    connected: boolean;
    message: TOrdersList | null;
    error: string | null;
};

export const initialState: TOrdersUserState = {
    connected: false,
    message: null,
    error: null
};

export function ordersUserReducer(state = initialState, action: TOrdersUserActions): TOrdersUserState {
    switch (action.type) {
        case ORDERS_USER_SUCCESS:
            return { ...state, error: null, connected: true };
        case ORDERS_USER_ERROR:
            return { ...state, error: action.error, connected: false };
        case ORDERS_USER_CLOSED:
            return { ...state, error: null, connected: false };
        case ORDERS_USER_MESSAGE:
            return { ...state, error: null, message: action.message };
        default:
            return state;
    }
}