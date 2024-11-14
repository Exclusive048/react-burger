import orderDetailsStyles from "./order-details.module.css";
import Modal from "../../components/modal/modal";
import PropTypes from "prop-types";

const OrderDetails = (props) => {
    console.log("OrderDetails is rendering");
    console.log("OrderDetails show:", props.show);
    return (
        <Modal show={props.show}onCloseModal={props.onCloseModal}>
            <div>
                <div className={`${orderDetailsStyles.orderId} text text_type_digits-large mt-30`}> 
                    {props.identifierOrder}
                </div>
                <div className={`${orderDetailsStyles.textOrder} mt-8`}>
                    идентификатор заказа
                </div>
                <div className={`${orderDetailsStyles.iconBox} mb-15 mt-15`}/>
                <p className={`${orderDetailsStyles.textBottom} mb-2`}>
                    Ваш заказ начали готовить
                </p>
                <p className={`${orderDetailsStyles.textBottom} ${orderDetailsStyles.bottomColor} mb-30`}>
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </Modal>
    )
}

OrderDetails.propTypes = {
    identifierOrder: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};

export default OrderDetails;
