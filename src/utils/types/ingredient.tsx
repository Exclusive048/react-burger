import { TServerResponse } from "./response"

export type TIngredient = {
	_id: string
	id?: string
	name: string
	type: string
	proteins: number
	fat: number
	carbohydrates: number
	calories: number
	price: number
	image: string
	image_mobile: string
	image_large: string
	__v: number
}

export type TIngredientQty = TIngredient & { qty: number }

export type TIngredientShort = Omit<TIngredient, '_id' | 'type' | 'proteins' | 'fat' | 'carbohydrates' | 'calories' | 'image_mobile' | 'image_large' | '__v'>

export type TIngredientItemProps = {
	name: string
	price: number
	id: string
	image: string
	index: number
}

export type TIngredientItemPropsShort = Omit<TIngredientItemProps, 'moveFilling' | 'index'>

export type TBurgerIngredient = {
	item: TIngredient;
  };

export type TIngredientResponse = TServerResponse<{ data: Array<TIngredient> }>
