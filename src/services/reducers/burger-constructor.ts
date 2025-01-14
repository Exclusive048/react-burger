import { ADD_BUN, ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT } from "../actions/constants";
import { PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from "../../utils/types/ingredient";
import { TConstructorActions } from "../actions/burger-constructor";
import update from 'immutability-helper';

export type TConstructorState = {
    bun: TIngredient | null;
    ingredients: Array<TIngredient>;
};

const initialState: TConstructorState = {
    bun: null,
    ingredients: [],
};

export const burgerConstructorReducer = (state = initialState, action: TConstructorActions): TConstructorState => {
    switch (action.type) {
        case ADD_BUN: {
            return {
                ...state,
                bun: action.payload,
            };
        }
        case ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
            };
        }
        case DELETE_INGREDIENT: {
            return {
                ...state,
                ingredients: state.ingredients.filter(el => el.id !== action.payload),
            };
        }
        case MOVE_INGREDIENT: {
            const { dragIndex, hoverIndex } = action.payload;
            return {
                ...state,
                ingredients: update(state.ingredients, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, state.ingredients[dragIndex]],
                    ],
                }),
            };
        }
        default: {
            return state;
        }
    }
};