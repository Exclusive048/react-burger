import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, SHOW_INGREDIENT_DETAIL, HIDE_INGREDIENT_DETAIL } from "../actions/constants"
import { TIngredient } from "../../utils/types/ingredient";
import { TIngredientsActions } from "../actions/burger-ingredients";

export type TIngredientsState = {
	ingredients: Array<TIngredient>
	ingredientsRequest: boolean
	ingredientsFailed: boolean
    ingredientDetail: TIngredient | null
}

const initialState: TIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientDetail: null,
}
export const burgerIngredientsReducer = (state = initialState, action: TIngredientsActions) => {
    switch( action.type ) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsRequest: false,
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
                ingredients: [],
            }
        }
        case SHOW_INGREDIENT_DETAIL: {
            return {
                ...state,
                ingredientDetail: action.item,
            }
        }
        case HIDE_INGREDIENT_DETAIL: {
            return {
                ...state,
                ingredientDetail: null,
            }
        }
        default: {
            return state;
        }
    }
}