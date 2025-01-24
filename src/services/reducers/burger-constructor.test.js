import { expect } from "@jest/globals";
import { burgerConstructorReducer, initialState } from "./burger-constructor";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from "../actions/constants";
import { ingredients } from "../../utils/test-const.ts";

let bun = {
  _id: "643d69a5c3f7b9001cfa093d",
  name: "Флюоресцентная булка R2-D3",
  type: "bun",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  __v: 0,
};

const state = {
  ingredients: ingredients,
};

describe("burgerConstructor reducer", () => {
  it("should return initial state", () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(initialState);
  });

  it("should add bun", () => {
    expect(
      burgerConstructorReducer(initialState, {
        type: ADD_BUN,
        payload: bun,
      })
    ).toEqual({
      ...initialState,
      bun: bun,
    });
  });

  it("should add ingredient", () => {
    const stateWithIngredient = burgerConstructorReducer(initialState, {
      type: ADD_INGREDIENT,
      payload: ingredients[0],
    });

    expect(stateWithIngredient).toEqual({
      ...initialState,
      ingredients: [...initialState.ingredients, ingredients[0]],
    });
  });

  it("should delete ingredient", () => {
    const stateWithDeletedIngredient = burgerConstructorReducer(state, {
      type: DELETE_INGREDIENT,
      payload: "0", // Обратите внимание на изменение
    });

    expect(stateWithDeletedIngredient).toEqual({
      ...state,
      ingredients: [ingredients[1]],
    });
  });

  it("should move ingredient", () => {
    const movedState = burgerConstructorReducer(state, {
      type: MOVE_INGREDIENT,
      payload: { dragIndex: 0, hoverIndex: 1 },
    });

    expect(movedState).toEqual({
      ...state,
      ingredients: [ingredients[1], ingredients[0]],
    });
  });
});
