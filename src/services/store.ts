import { configureStore, combineReducers, Middleware } from '@reduxjs/toolkit';
import { burgerConstructorReducer } from './reducers/burger-constructor';
import { burgerIngredientsReducer } from './reducers/burger-ingredients';
import { makeOrderReducer } from './reducers/make-order';
import { selectTabReducer } from './reducers/tabs';
import { userReducer } from './reducers/user';
import { ordersAllReducer } from './reducers/feed-ws';
import { ordersUserReducer } from './reducers/order-user-ws';
import { getOrderReducer } from './reducers/get-order';
import { socketMiddleware } from './middleware/socket-middleware';
import { wsOrdersAllActions } from './actions/feed-ws';
import { wsOrdersUserActions } from './actions/order-user-ws';

const rootReducer = combineReducers({
    constructorBurger: burgerConstructorReducer,
    ingredients: burgerIngredientsReducer,
    currentTab: selectTabReducer,
    makeOrder: makeOrderReducer,
    user: userReducer,
    feed: ordersAllReducer,
    userOrder: ordersUserReducer,
    getOrder: getOrderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const middleware: Middleware[] = [
    socketMiddleware(wsOrdersAllActions),
    socketMiddleware(wsOrdersUserActions),
];

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

export type AppDispatch = typeof store.dispatch;
export type EnhancedStore = typeof store;
