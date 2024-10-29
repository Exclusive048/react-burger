import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Data from "../../utils/data";
import Tabs from "../../utils/tabs";

const App = (props) => {
    
    return(
        <>
            <AppHeader/>
            <section className={appStyles.row}>
                <div>
                    <BurgerIngredients tabs={Tabs} data={Data} />
                </div>
                <div>
                    <BurgerConstructor data={Data}/>
                </div> 
            </section>
        </>
    )
}

export default App;