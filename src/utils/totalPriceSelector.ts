import { TIngredient } from "./types/ingredient";
import { RootState } from "../services/store";

export const totalPriceSelector = (store: RootState): number => {
    const { constructorBurger: { bun, ingredients},} = store;
    let totalprice = bun ? bun.price * 2 : 0;
    return ingredients.reduce((acc: number, item: TIngredient) => acc + item.price, totalprice );
};