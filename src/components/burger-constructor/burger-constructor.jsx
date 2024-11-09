import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css"
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import { useState } from "react";
import { IngredientType } from '../../utils/types';


const BurgerConstructor = (props) => {
    const [show, setShow] = useState(false)
    console.log(show)
    return (
      <>
        {show && (
        <OrderDetails 
            identifierOrder={"034536"} 
            onCloseModal={() => setShow(false)}
            show={show}
        />
        )}
          <div className={`${burgerConstructorStyles.basketList} mt-25`}>
            <div className={`${burgerConstructorStyles.external} ml-4 mr-4 mb-4`}>
                <ConstructorElement type="top" isLocked={true} text={props.data[0].name + ' (верх)'} price={props.data[0].price} thumbnail={props.data[0].image}/>
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
                <ConstructorElement type="bottom" isLocked={true} text={props.data[0].name + ' (низ)'} price={props.data[0].price} thumbnail={props.data[0].image}/>
            </div>
            <div className={`${burgerConstructorStyles.orderInfo} mt-10`}>
                <div className={`${burgerConstructorStyles.orderInfoPrice} mr-10`}>
                    <p className="mr-1 text text_type_digits-medium">18783</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={burgerConstructorStyles.orderInfoButton}>
                    <Button htmlType="button" type="primary" size="large" onClick={() => {setShow(true); console.log('Current show state', show); }}>Оформить заказ</Button>
                </div>
            </div>
      </div>
      </>
    );
  }


  BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(IngredientType.isRequired)
  };


  export default BurgerConstructor;