import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { burgerConstructorReducer } from './burger-constructor';
import { burgerIngredientsReducer } from './burger-ingredients';
import { makeOrderReducer } from './make-order';
import { selectTabReducer } from './tabs';

const rootReducer = {
    constructorBurger: burgerConstructorReducer,
    ingredients: burgerIngredientsReducer,
    currentTab: selectTabReducer,
    makeOrder: makeOrderReducer,
};

export const store = configureStore({
  reducer: rootReducer
})
