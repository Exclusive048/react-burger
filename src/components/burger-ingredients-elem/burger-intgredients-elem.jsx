import elemStyles from "./burger-ingredients-elem.module.css";
import { CurrencyIcon, Counter,} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux'
import { SHOW_INGREDIENT_DETAIL } from "../../services/actions/burger-ingredients";
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';

const BurgerIngredientsElem = ({item}) => {
  
  const dispatch = useDispatch();
 
  const ingredientClick = () => {
    dispatch({
      type: SHOW_INGREDIENT_DETAIL,
      item
    });
  };

	const { bun, ingredients } = useSelector(state => state.constructorBurger);
  const count = useMemo(() => {
    return [bun, ...ingredients].filter(el => {
      if (el) {
        return el._id === item._id;
      }
      return false;
    }).length;
  }, [bun, ingredients]);
 

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: { ...item },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  return (
    
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
  );
}

const item = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
})

BurgerIngredientsElem.propTypes = {
  item: item.isRequired,
};




export default BurgerIngredientsElem;