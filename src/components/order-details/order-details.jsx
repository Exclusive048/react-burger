import orderDetailsStyles from "./order-details.module.css";
import PropTypes from "prop-types";

const OrderDetails = (props) => {
    return(
            <div>
                <div className={`${orderDetailsStyles.orderId} text text_type_digits-large`}> 
                    {props.orderIdentifier}
                </div>
                <div className={`${orderDetailsStyles.textOrder} mb-15`}>
                    идентификатор заказа
                </div>
                <div className={`${orderDetailsStyles.iconBox} mb-15`}/>
                    <p className={`${orderDetailsStyles.textBottom}`}>
                        Ваш заказ начали готовить
                    </p>
                    <p className={`${orderDetailsStyles.textBottom} ${orderDetailsStyles.bottomColor} mb-15`}>
                        Дождитесь готовности на орбитальной станции
                    </p>
            </div>
    )
}

OrderDetails.propTypes = {
    orderIdentifier: PropTypes.number.isRequired
  }

export default OrderDetails;