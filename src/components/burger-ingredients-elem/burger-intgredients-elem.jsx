import elemStyles from "./burger-ingredients-elem.module.css";
import { CurrencyIcon, Counter,} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";



const BurgerIngredientsElem = (props) => {
  return (
    <div className={`${elemStyles.elem} ml-4 mr-5 mb-10 mt-6`} onClick={props.onClick}>
      <img className={`${elemStyles.elem} ml-4 mr-5`} alt={props.imageSrc.name} src={props.imageSrc}>
      </img>
      <div className={`${elemStyles.price} mb-1 mt-1`}>
        <p className="text text_type_digits-small mr-2">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${elemStyles.name} text text_type_main-small`}>
        {props.name}
      </p>
      <Counter count={1} size="default" />
    </div>
  );
}

BurgerIngredientsElem.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};


export default BurgerIngredientsElem;