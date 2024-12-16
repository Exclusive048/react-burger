import elemStyles from "./burger-ingredients-elem.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_INGREDIENT_DETAIL } from "../../services/actions/burger-ingredients";
import { useMemo } from "react";
import { useDrag } from "react-dnd";
import { IngredientType } from "../../utils/types";
import { Link, useLocation } from "react-router-dom";

type BurgerIngredientsElemProps = {
  item: IngredientType;
};

const BurgerIngredientsElem: React.FC<BurgerIngredientsElemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const ingredientClick = () => {
    dispatch({
      type: SHOW_INGREDIENT_DETAIL,
      item,
    });
  };

  const { bun, ingredients } = useSelector((state: any) => state.constructorBurger);

  const count = useMemo(() => {
    return [bun, ...ingredients].filter((el) => el && el._id === item._id).length;
  }, [bun, ingredients, item._id]);

  const [{ opacity }, ref] = useDrag({
    type: "ingredient",
    item: { ...item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <Link
      key={item._id}
      to={`/ingredients/${item._id}`}
      state={{ backgroundLocation: location }}
      className={elemStyles.link}
    >
      <div
        className={`${elemStyles.elem} ml-4 mr-5 mb-10 mt-6`}
        ref={ref}
        style={{ opacity }}
        onClick={ingredientClick}
      >
        <img
          className={`${elemStyles.elem} ml-4 mr-5`}
          alt={`${item.name} preview`}
          src={item.image}
        />
        <div className={`${elemStyles.price} mb-1 mt-1`}>
          <p className="text text_type_digits-small mr-2">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${elemStyles.name} text text_type_main-small`}>{item.name}</p>
        {count > 0 && <Counter count={count} size="default" />}
      </div>
    </Link>
  );
};

export default BurgerIngredientsElem;
