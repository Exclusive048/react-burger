import type { Middleware, MiddlewareAPI } from 'redux';
import { TwsOrdersAllActions } from '../actions/feed-ws';
import { TwsOrdersUserActions } from '../actions/order-user-ws';
import { getCookie } from '../../utils/cookie';
import { AppDispatch, RootState } from '../store';

export const socketMiddleware = (wsActions: TwsOrdersAllActions | TwsOrdersUserActions): Middleware<{}, RootState, AppDispatch> => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let timerWsReconnect = 0;
        let isWsConnected = false;
        let url = '';

        return (next) => (action: any) => {
            const { dispatch } = store;

            if ('type' in action && action.type === wsActions.onStart) {
                url = action.url;
                if ('addToken' in action && action.addToken) {
                    url += `?token=${getCookie('accessToken')}`;
                }
                socket = new WebSocket(url);
                console.log('wsCreated');

                isWsConnected = true;
                window.clearTimeout(timerWsReconnect);
                dispatch({ type: wsActions.onSuccess });
            }

            if (socket) {
                socket.onopen = () => {
                    console.log('onopen');
                    dispatch({ type: wsActions.onOpen });
                };

                socket.onclose = (event) => {
                    if (event.code !== 1000) {
                        console.log('onclose');
                        dispatch({ type: wsActions.onError, error: 'Connection closed unexpectedly' });
                        socket?.close();
                    }
                    if (isWsConnected) {
                        dispatch({ type: wsActions.onClosed });
                        timerWsReconnect = window.setTimeout(() => {
                            dispatch({ 
                                type: wsActions.onStart, 
                                url: url, 
                                addToken: 'addToken' in action ? action.addToken : false 
                            });
                        }, 30000);
                    }
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: wsActions.onMessage, message: parsedData });
                };

                socket.onerror = (event) => {
                    dispatch({ type: wsActions.onError, error: event.type });
                };

                if ('type' in action && action.type === wsActions.onDisconnect) {
                    window.clearTimeout(timerWsReconnect);
                    isWsConnected = false;
                    timerWsReconnect = 0;
                    socket.close();
                    dispatch({ type: wsActions.onClosed });
                }
            }

            return next(action);
        };
    };
};
