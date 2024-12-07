import ingredientDetailsStyle from "./ingredient-details.module.css"
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const IngredientDetails = () =>{
    const { id } = useParams();
    const ingredient = useSelector(state => state.ingredients.ingredients.find(ingredient => ingredient._id === id))

    return (
        <>
        {ingredient &&
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
        }
        </>
    )
}

export default IngredientDetails;