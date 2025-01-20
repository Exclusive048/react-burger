import { expect } from '@jest/globals'
import { burgerConstructorReducer, initialState } from './burger-constructor';
import { ADD_BUN, ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT } from '../actions/constants';
import { ingredients } from '../../utils/test-const';

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
    __v: 0
}

const state = {
    ingredients: ingredients
}


describe( 'burgerConstructor reducer', () => {
    it('should return initial state', () => {
		expect(burgerConstructorReducer(undefined, {})).toEqual(initialState)
	})

    it('should add bun', () => { 
        expect(
            burgerConstructorReducer(
            initialState, 
            {
                type: ADD_BUN,
                bun: bun,
            })
        ).toEqual({
            ...initialState,
            bun: bun,
        })
    })

    it('should add ingredient', () => {
        expect(
            burgerConstructorReducer(
                initialState,
                {
                    type: ADD_INGREDIENT,
                    ingredient: ingredients[0],
                }
            )
        ).toEqual({
            ...initialState,
            ingredients:[...initialState.ingredients, ingredients[0]]
        })
    })

    it('should delete ingredient', () => {
		expect(
            burgerConstructorReducer(
                state, 
                {
                    type: DELETE_INGREDIENT,
                    id: '0'

                })
            ).toEqual({
			...state,
			ingredients: [ingredients[1]],
		})
	})

    it('should move ingredient', () => {
        expect(
            burgerConstructorReducer(
                state,
                {
                    type: MOVE_INGREDIENT,
                    dragIndex: 0,
                    hoverIndex: 1,
                })
        ).toEqual({
            ...state,
            ingredients: [ingredients[1], ingredients[0]]
        })
    })


})