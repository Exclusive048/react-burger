import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css"
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from 'react-redux'
import { HIDE_ORDER_DETAIL } from "../../services/actions/make-order";
import { makeOrder } from "../../services/actions/make-order";
import { ADD_BUN, ADD_INGREDIENT } from "../../services/actions/burger-constructor";
import { useDrop } from 'react-dnd';
import { v4 } from 'uuid';
import { totalPriceSelector } from "../../utils/total-price-selector";
import BurgerConstructorElem from "../burger-constructor-elem/burger-constructor-elem";


const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const orderIdentifier = useSelector(store => store.makeOrder.orderIdentifier)
    const { bun, ingredients } = useSelector(store => store.constructorBurger)
    const [, dropTarget] = useDrop({
		accept: 'ingredient',
         drop(item) { addIngredient({...item, id: v4()}) }
  });

	const addIngredient = (item) => {
		if(item.type === 'bun') {
			dispatch({
				type: ADD_BUN,
				bun: item
			});
		}
		else {
			dispatch({
				type: ADD_INGREDIENT,
  				ingredient: item
			});
		}
  };

    const totalPrice = useSelector(totalPriceSelector);

    const handleClose = () => {
		dispatch({type: HIDE_ORDER_DETAIL});
	}

    const onSubmit = (e) => {
        e.preventDefault();
        const burgerElems = [bun, ...ingredients]
        const ingredientsIds = burgerElems.map( el => el._id)
        dispatch(makeOrder(ingredientsIds));
    }
    
    return (
      <>
        { orderIdentifier && 
            <Modal onCloseModal={handleClose}>
                <OrderDetails orderIdentifier={orderIdentifier}/>
            </Modal> }
        
          <div className={`${burgerConstructorStyles.basketList} mt-25` } ref={dropTarget}>
          { (bun) ?
          <>
            <div className={`${burgerConstructorStyles.external} ml-4 mr-4 mb-4`}>
                <ConstructorElement type="top" isLocked={true} text={`${bun.name} - верх`} price={bun.price} thumbnail={bun.image}/>
            </div>
            <div className={burgerConstructorStyles.internal}>
                {ingredients && 
                    ingredients.map((elem, index) => {
                    {
                    return (
                      <BurgerConstructorElem text={elem.name} price={elem.price} thumbnail={elem.image} id={elem.id} key={elem.id} index={index} />
                    );
                }
                
                })}
            </div>
            <div className="ml-4 mr-4 mb-4">
                <ConstructorElement type="bottom" isLocked={true} text={`${bun.name} - низ`} price={bun.price} thumbnail={bun.image}/>
            </div>
            <div className={`${burgerConstructorStyles.orderInfo} mt-10`}>
                <div className={`${burgerConstructorStyles.orderInfoPrice} mr-10`}>
                    <p className="mr-1 text text_type_digits-medium">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={burgerConstructorStyles.orderInfoButton}>
                    <Button htmlType="submit" type="primary" size="large" onClick={onSubmit}>Оформить заказ</Button>
                </div>
            </div>
            </> : 
            <p>Перетащи сюда булочку, булочка</p>
        }
      </div>
      </>
    );
  }

  export default BurgerConstructor;