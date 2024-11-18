import ingredientDetailsStyle from "./ingredient-details.module.css"
import PropTypes from "prop-types";

const IngredientDetails = ({ingredient}) =>{
    return (
        <div className={ingredientDetailsStyle.mainContainer}>
            <img alt="previewImage" src={ingredient.image_large}/>
            <p className={`${ingredientDetailsStyle.ingredientNameText}text text_type_main-medium mt-4`}>
                {ingredient.name}
            </p>
            <div className={`${ingredientDetailsStyle.macronutrientContainer} mt-8 mb-15`}>
                <div className={ingredientDetailsStyle.macronutrientElem}>
                    <p className="text text_type_main-small text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
                </div>
                <div className={ingredientDetailsStyle.macronutrientElem}>
                    <p className="text text_type_main-small text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
                </div>
                <div className={ingredientDetailsStyle.macronutrientElem}>
                    <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
                </div>
                <div className={ingredientDetailsStyle.macronutrientElem}>
                    <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}

const ingredient = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,

  });
  
IngredientDetails.propTypes = {
    ingredient: ingredient.isRequired,
};

export default IngredientDetails;