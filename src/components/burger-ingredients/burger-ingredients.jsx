import ingredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import BurgerIngredientsElem from "../burger-ingredients-elem/burger-intgredients-elem";
import PropTypes from "prop-types";

const BurgerIngredients = (props) => {
  const [currentTab, setCurrentTab] = useState("bun");

  return (
    <>
      <p className="text text_type_main-large mb-5 mt-10">Соберите бургер</p>
      <div className={`${ingredientsStyles.tabs} mb-10`}>
        {props.tabs.map((tab) => (
          <Tab
            value={tab.value}
            active={currentTab === tab.value}
            onClick={setCurrentTab}
          >
            {tab.name}
          </Tab>
        ))}
      </div>
      {props.data && (
        <div className={ingredientsStyles.components}>
          {props.tabs.map((tab) => (
            <section key={tab._id}>
              <p className="text text_type_main-medium">{tab.name}</p>
              <div className={`${ingredientsStyles.elem_container} ml-4`}>
                {props
                  .data.filter((elem) => elem.type === tab.type)
                  .map((data) => (
                    <BurgerIngredientsElem
                      imageSrc={data.image}
                      price={data.price}
                      name={data.name}
                    />
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}

const tab = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

const data = PropTypes.shape({
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

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(data.isRequired),
  tabs: PropTypes.arrayOf(tab.isRequired),
};



export default BurgerIngredients;