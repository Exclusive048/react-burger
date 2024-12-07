export const totalPriceSelector = (store) => {
  const {
    constructorBurger: { bun, ingredients },
  } = store;
  let totalprice = bun ? bun.price * 2 : 0;
  return ingredients.reduce((acc, item) => acc + item.price, totalprice);
};
