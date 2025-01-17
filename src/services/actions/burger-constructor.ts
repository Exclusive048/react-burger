import { PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from "../../utils/types/ingredient";
import { ADD_BUN, ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT, TEST } from "./constants";

interface IAddBun extends PayloadAction<TIngredient> {
    readonly type: typeof ADD_BUN;
}
interface IAddIngredient extends PayloadAction<TIngredient> {
    readonly type: typeof ADD_INGREDIENT;
}
interface IDeleteIngredient extends PayloadAction<string> {
    readonly type: typeof DELETE_INGREDIENT;
}
interface IMoveIngredient extends PayloadAction<{ dragIndex: number; hoverIndex: number }> {
    readonly type: typeof MOVE_INGREDIENT;
}
interface ITEST extends PayloadAction<void> {
    readonly type: typeof TEST;
}

export type TConstructorActions = 
    | IAddBun
    | IAddIngredient
    | IDeleteIngredient
    | IMoveIngredient
    | ITEST;

export const addBun = (bun: TIngredient): IAddBun => ({
    type: ADD_BUN,
    payload: bun,
});

export const addIngredient = (ingredient: TIngredient): IAddIngredient => ({
    type: ADD_INGREDIENT,
    payload: ingredient,
});

export const deleteIngredient = (id: string): IDeleteIngredient => ({
    type: DELETE_INGREDIENT,
    payload: id,
});

export const moveIngredient = (
    dragIndex: number,
    hoverIndex: number
): IMoveIngredient => ({
    type: MOVE_INGREDIENT,
    payload: { dragIndex, hoverIndex },
});