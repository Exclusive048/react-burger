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


export type TIngredientShort = Omit<TIngredient, '_id' | 'type' | 'proteins' | 'fat' | 'carbohydrates' | 'calories' | 'image_mobile' | 'image_large' | '__v'>


export type TBurgerIngredient = {
	item: TIngredient;
  };