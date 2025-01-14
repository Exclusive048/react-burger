import { useEffect, FC } from 'react';
import ingredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsElem from "../burger-ingredients-elem/burger-intgredients-elem";
import tabs from "../../utils/tabs";
import { switchTab } from '../../services/actions/tabs';
import { useInView } from "react-intersection-observer";
import { TCategoryRefMap } from '../../utils/types/category-type';
import { TIngredient } from '../../utils/types/ingredient';
import { useAppDispatch, useAppSelector } from '../../utils/types/hooks';

const BurgerIngredients: FC = () => {
  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector(store => store.ingredients)
  const { currenttab } = useAppSelector(store => store.currentTab )
  console.log(currenttab)
 

  const onTabClick = (value: string) => {
    dispatch(switchTab(value));
		const element = document.getElementById(value);
    if (element) element.scrollIntoView({ behavior: "smooth" });
	};

  const inViewOptions = {
    threshold: 0,
    trackVisibility: true,
    delay: 100
  };

  const [bunRef, inViewBun] = useInView(inViewOptions);
  const [mainRef, inViewMain] = useInView(inViewOptions);
  const [sauceRef, inViewSauce] = useInView(inViewOptions);
    
  const categoryRefMap: TCategoryRefMap = {
    bun: { ref: bunRef },
    sauce: { ref: sauceRef},
    main: { ref: mainRef},
  };

  useEffect(() => {
    if (inViewBun) {
      dispatch(switchTab('bun'));
    }
    else if (inViewSauce) {
      dispatch(switchTab('sauce'));
    }
    else if (inViewMain) {
      dispatch(switchTab('main'));
    }
   }, [inViewBun, inViewSauce, inViewMain]);

  return (
    <>
      <p className="text text_type_main-large mb-5 mt-10">Соберите бургер</p>
      <div className={`${ingredientsStyles.tabs} mb-10`}>
        {tabs.map((tab) => (
          <Tab key={tab._id} value={tab.value} active={currenttab === tab.value}
            onClick={() => onTabClick(tab.value)}
          >
            {tab.name}
          </Tab>
        ))}

      </div>
      {ingredients && (
        <div className={ingredientsStyles.components}>
          {tabs.map((tab) => (
            <section ref={categoryRefMap[tab.type].ref} id={tab.type} key={tab._id} >
              <p className="text text_type_main-medium">{tab.name}</p>
              <div className={`${ingredientsStyles.elem_container} ml-4`}>
                { ingredients &&
                  ingredients
                  .filter((elem: TIngredient) => elem.type === tab.type)
                  .map((el: TIngredient) => {
                    return <BurgerIngredientsElem item={el} key={el._id}/>
                  }
                  )}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}

export default BurgerIngredients;