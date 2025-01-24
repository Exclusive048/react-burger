import { expect } from "@jest/globals";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SHOW_INGREDIENT_DETAIL,
  HIDE_INGREDIENT_DETAIL,
} from "../actions/constants";
import { ingredients } from "../../utils/test-const.ts";

import { burgerIngredientsReducer, initialState } from "./burger-ingredients";

describe("burgetIngredients reducer", () => {
  it("should return initial state", () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual(initialState);
  });

  it("should set ingredientsRequest flag", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_INGREDIENTS_REQUEST,
      })
    ).toEqual({
      ...initialState,
      ingredientsRequest: true,
    });
  });
  it("should set ingredients", () => {
    let response = { success: true, data: ingredients };
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: response.data,
      })
    ).toEqual({
      ...initialState,
      ingredientsFailed: false,
      ingredients: response.data,
      ingredientsRequest: false,
    });
  });
  it("should set ingredientsFailed flag", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_INGREDIENTS_FAILED,
      })
    ).toEqual({
      ...initialState,
      ingredientsRequest: false,
      ingredientsFailed: true,
    });
  });
  it("should show ingredient detail", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: SHOW_INGREDIENT_DETAIL,
        item: ingredients[0],
      })
    ).toEqual({
      ...initialState,
      ingredientDetail: ingredients[0],
    });
  });
  it("should hide ingredient detail", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: HIDE_INGREDIENT_DETAIL,
      })
    ).toEqual({
      ...initialState,
      ingredientDetail: null,
    });
  });
});
