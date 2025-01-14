import { TOrdersList } from "../../utils/types/order";
import {
    ORDERS_ALL_START,
    ORDERS_ALL_OPEN,
    ORDERS_ALL_END,
    ORDERS_ALL_SUCCESS,
    ORDERS_ALL_MESSAGE,
    ORDERS_ALL_CLOSED,
    ORDERS_ALL_ERROR
} from "./constants";

// Интерфейсы для действий WebSocket
export interface IOrdersAllStartAction {
    readonly type: typeof ORDERS_ALL_START;
    readonly url: string;
    readonly addToken?: boolean; // Добавлено для соответствия middleware
}

export interface IOrdersAllOpenAction {
    readonly type: typeof ORDERS_ALL_OPEN;
}

export interface IOrdersAllEndAction {
    readonly type: typeof ORDERS_ALL_END;
}

export interface IOrdersAllSuccessAction {
    readonly type: typeof ORDERS_ALL_SUCCESS;
}

export interface IOrdersAllErrorAction {
    readonly type: typeof ORDERS_ALL_ERROR;
    readonly error: string;
}

export interface IOrdersAllClosedAction {
    readonly type: typeof ORDERS_ALL_CLOSED;
}

export interface IOrdersAllMessageAction {
    readonly type: typeof ORDERS_ALL_MESSAGE;
    readonly message: TOrdersList;
}

// Объединение всех типов действий WebSocket
export type TOrdersAllActions =
    | IOrdersAllStartAction
    | IOrdersAllOpenAction
    | IOrdersAllEndAction
    | IOrdersAllSuccessAction
    | IOrdersAllErrorAction
    | IOrdersAllClosedAction
    | IOrdersAllMessageAction;

// Типы действий WebSocket
export type TwsOrdersAllActions = {
    onStart: typeof ORDERS_ALL_START;
    onOpen: typeof ORDERS_ALL_OPEN;
    onSuccess: typeof ORDERS_ALL_SUCCESS;
    onClosed: typeof ORDERS_ALL_CLOSED;
    onDisconnect: typeof ORDERS_ALL_END;
    onError: typeof ORDERS_ALL_ERROR;
    onMessage: typeof ORDERS_ALL_MESSAGE;
};

// Константы действий WebSocket
export const wsOrdersAllActions: TwsOrdersAllActions = {
    onStart: ORDERS_ALL_START,
    onOpen: ORDERS_ALL_OPEN,
    onSuccess: ORDERS_ALL_SUCCESS,
    onClosed: ORDERS_ALL_CLOSED,
    onDisconnect: ORDERS_ALL_END,
    onError: ORDERS_ALL_ERROR,
    onMessage: ORDERS_ALL_MESSAGE
};
