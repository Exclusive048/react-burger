import { getRequest } from "../../utils/get-request";
import baseURL from "../../utils/base-url";
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SHOW_INGREDIENT_DETAIL = 'SHOW_INGREDIENT_DETAIL';
export const HIDE_INGREDIENT_DETAIL = 'HIDE_INGREDIENT_DETAIL';


const ingredientsURL = `${baseURL}/ingredients`;

export function getIngredients() {
    return function (dispatch){
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })
        getRequest(ingredientsURL).then(res => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: res.data
            });
        })
        .catch(() => {
            dispatch({ type: GET_INGREDIENTS_FAILED });
        });
    }; 
}