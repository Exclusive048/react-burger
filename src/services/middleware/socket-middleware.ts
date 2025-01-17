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

        const reconnect = () => {
            if (isWsConnected) {
                console.log('Attempting to reconnect...');
                store.dispatch({ 
                    type: wsActions.onStart, 
                    url: url,
                    addToken: true,
                });
            }
        };

        const clearSocket = () => {
            if (socket) {
                socket.onopen = null;
                socket.onclose = null;
                socket.onerror = null;
                socket.onmessage = null;
                socket.close();
                socket = null;
            }
        };

        return (next) => (action: any) => {
            const { dispatch } = store;

            if ('type' in action && action.type === wsActions.onStart) {
                url = action.url;
                if ('addToken' in action && action.addToken) {
                    url += `?token=${getCookie('accessToken')}`;
                }

                clearSocket(); // Очистить предыдущее соединение перед созданием нового
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
                    console.log(`onclose: ${event.reason || 'Connection closed'}`);
                    if (event.code !== 1000) {
                        dispatch({ type: wsActions.onError, error: 'Connection closed unexpectedly' });
                    }

                    if (isWsConnected) {
                        dispatch({ type: wsActions.onClosed });
                        timerWsReconnect = window.setTimeout(() => reconnect(), 5000); // Попробовать переподключиться через 5 секунд
                    }
                };

                socket.onmessage = (event) => {
                    try {
                        const parsedData = JSON.parse(event.data);
                        dispatch({ type: wsActions.onMessage, message: parsedData });
                    } catch (error) {
                        console.error('Error parsing WebSocket message:', error);
                    }
                };

                socket.onerror = (event) => {
                    console.error('WebSocket error:', event);
                    dispatch({ type: wsActions.onError, error: 'WebSocket error' });
                    // Переподключение при ошибке
                    timerWsReconnect = window.setTimeout(() => reconnect(), 5000);
                };

                if ('type' in action && action.type === wsActions.onDisconnect) {
                    console.log('Disconnecting WebSocket');
                    window.clearTimeout(timerWsReconnect);
                    isWsConnected = false;
                    timerWsReconnect = 0;
                    clearSocket();
                    dispatch({ type: wsActions.onClosed });
                }
            }

            return next(action);
        };
    };
};
