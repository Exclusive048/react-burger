import { TIngredient } from "./types/ingredient.js";

export const totalPriceSelector = (store: any): number => {
    const { constructorBurger: { bun, ingredients},} = store;
    let totalprice = bun ? bun.price * 2 : 0;
    return ingredients.reduce((acc: number, item: TIngredient) => acc + item.price, totalprice );
};