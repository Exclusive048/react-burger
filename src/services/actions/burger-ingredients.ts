import { getRequest } from "../../utils/get-request";
import { baseURL } from "../../utils/base-url";
import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, SHOW_INGREDIENT_DETAIL, HIDE_INGREDIENT_DETAIL } from "./constants";
import { AppDispatch } from "../store";
import { TIngredient, TIngredientResponse } from "../../utils/types/ingredient";

interface IGetIngredientsRequest {
	readonly type: typeof GET_INGREDIENTS_REQUEST
}

interface IGetIngredientsSuccess {
	readonly type: typeof GET_INGREDIENTS_SUCCESS
	readonly ingredients: Array<TIngredient>
}

interface IGetIngredientsFailed {
	readonly type: typeof GET_INGREDIENTS_FAILED
}

interface IShowIngredientDetail {
	readonly type: typeof SHOW_INGREDIENT_DETAIL
	readonly item: TIngredient
}

interface IHideIngredientDetail {
	readonly type: typeof HIDE_INGREDIENT_DETAIL
}


export type TIngredientsActions =
	| IGetIngredientsRequest
	| IGetIngredientsFailed
	| IGetIngredientsSuccess
	| IShowIngredientDetail
	| IHideIngredientDetail

const getIngredientsRequest = (): IGetIngredientsRequest => ({
	type: GET_INGREDIENTS_REQUEST,
})

const getIngredientsSuccess = (res: TIngredientResponse): IGetIngredientsSuccess => ({
	type: GET_INGREDIENTS_SUCCESS,
	ingredients: res.data,
})

const getIngredientsFailed = (): IGetIngredientsFailed => ({
	type: GET_INGREDIENTS_FAILED,
})

export const showIngredientDetail  = (item: TIngredient): IShowIngredientDetail => ({
	type: SHOW_INGREDIENT_DETAIL,
	item: item
})

export const hideIngredientDetail  = (): IHideIngredientDetail => ({
	type: HIDE_INGREDIENT_DETAIL,
})

const ingredientsURL: string = `${baseURL}/ingredients`;

export function getIngredients() {
    return function (dispatch: AppDispatch){
        dispatch(getIngredientsRequest())
        getRequest(ingredientsURL).then(res => {
            dispatch(getIngredientsSuccess(res));
        })
        .catch(() => {
            dispatch(getIngredientsFailed());
        });
    }; 
}