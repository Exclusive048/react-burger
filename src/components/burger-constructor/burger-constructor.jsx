import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css"
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import { useState } from "react";



const BurgerConstructor = (props) => {
    const [show, setShow] = useState(false)

    return (
      <>
        <OrderDetails show={show} identifierOrder={"034536"} onCloseModal={() => setShow(false)}/>
          <div className={`${burgerConstructorStyles.basketList} mt-25`}>
            <div className={`${burgerConstructorStyles.external} ml-4 mr-4 mb-4`}>
                <ConstructorElement type="top" isLocked={true} text={props.data[0].name} price={props.data[0].price} thumbnail={props.data[0].image}/>
            </div>
            <div className={burgerConstructorStyles.internal}>
                {props.data.map((elem, index) => {
                if (elem.type !== "bun") {
                    return (
                    <div key={index} className={`${burgerConstructorStyles.ingredientElem} ml-4 mr-4 mb-4`}>
                        <DragIcon type="primary"/>
                        <ConstructorElement text={elem.name} price={elem.price} thumbnail={elem.image}/>
                    </div>
                    );
                }
                return null;
                })}
            </div>
            <div className="ml-4 mr-4 mb-4">
                <ConstructorElement type="bottom" isLocked={true} text={props.data[props.data.length-1].name} price={props.data[props.data.length-1].price} thumbnail={props.data[props.data.length-1].image}/>
            </div>
            <div className={`${burgerConstructorStyles.orderInfo} mt-10`}>
                <div className={`${burgerConstructorStyles.orderInfoPrice} mr-10`}>
                    <p className="mr-1 text text_type_digits-medium">18783</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={burgerConstructorStyles.orderInfoButton}>
                    <Button htmlType="button" type="primary" size="large" onClick={() => setShow(true)}>Оформить заказ</Button>
                </div>
            </div>
      </div>
      </>
    );
  }


  
  const ingredient = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  });

  BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredient.isRequired)
  };


  export default BurgerConstructor;