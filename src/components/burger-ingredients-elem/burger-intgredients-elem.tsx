import elemStyles from "./burger-ingredients-elem.module.css";
import { CurrencyIcon, Counter,} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../utils/types/hooks";
import { showIngredientDetail } from "../../services/actions/burger-ingredients";
import { useMemo, FC } from 'react';
import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router'
import { TBurgerIngredient } from "../../utils/types/ingredient";



const BurgerIngredientsElem: FC<TBurgerIngredient> = ({item}) => {
  const dispatch = useAppDispatch();
  const location = useLocation()
  const ingredientClick = () => {
    dispatch(showIngredientDetail(item));
  };

	const { bun, ingredients } = useAppSelector(state => state.constructorBurger);
  const count = useMemo(() => {
    return [bun, ...ingredients].filter(el => {
      if (el) {
        return el._id === item._id;
      }
      return false;
    }).length;
  }, [bun, ingredients, item._id]);
 

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: { ...item },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  return (
    <Link
        key={item._id}
				to={`/ingredients/${item._id}`}
				state={{ backgroundLocation: location }}
        className={elemStyles.link}
		>
      <div className={`${elemStyles.elem} ml-4 mr-5 mb-10 mt-6`} ref={ref} style={{opacity}} onClick={ingredientClick}>
        <img className={`${elemStyles.elem} ml-4 mr-5`} alt="previewImage" src={item.image}/>
        <div className={`${elemStyles.price} mb-1 mt-1`}>
          <p className="text text_type_digits-small mr-2">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${elemStyles.name} text text_type_main-small`}>
          {item.name}
        </p>
        {count > 0 && <Counter count={count} size='default'/>}
      </div>
    </Link>
  );
}

export default BurgerIngredientsElem;