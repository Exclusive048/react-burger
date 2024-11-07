import ingredientDetailsStyle from "./ingredient-details.module.css"
import PropTypes from "prop-types";

const IngredientDetails = (props) =>{
    return (
        <div className={ingredientDetailsStyle.mainContainer}>
            <img alt={props.ingredientImg.img} src={props.ingredientImg}/>
            <p className={`${ingredientDetailsStyle.ingredientNameText}text text_type_main-medium mt-4`}>
                {props.ingredientName}
            </p>
            <div className={`${ingredientDetailsStyle.macronutrientContainer} mt-8 mb-15`}>
                <div className={ingredientDetailsStyle.macronutrientElem}>
                    <p className="text text_type_main-small text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{props.ingredientCalories}</p>
                </div>
                <div className={ingredientDetailsStyle.macronutrientElem}>
                    <p className="text text_type_main-small text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{props.ingredientProtein}</p>
                </div>
                <div className={ingredientDetailsStyle.macronutrientElem}>
                    <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{props.ingredientFat}</p>
                </div>
                <div className={ingredientDetailsStyle.macronutrientElem}>
                    <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{props.ingredeintCarbohydrates}</p>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    onCloseModal: PropTypes.func,
    ingredientImg: PropTypes.string.isRequired,
    ingredientNameText: PropTypes.string,
    ingredientCalories: PropTypes.number.isRequired,
    ingredientProtein: PropTypes.number.isRequired,
    ingredientFat: PropTypes.number.isRequired,
    ingredeintCarbohydrates: PropTypes.number.isRequired,

}

export default IngredientDetails;