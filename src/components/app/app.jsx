import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Tabs from "../../utils/tabs";
import { useState, useEffect } from "react";

const ingredientsURL = "https://norma.nomoreparties.space/api/ingredients";

const App = () => {
    const [stateRequest, setRequesState] = useState({
        isLoading: false,
        hasError: false,
        ingredients: []
    });
    
    const [successed, setSuccessed] = useState(false);

    async function getIngredients() {
        try {
            setRequesState({ ...stateRequest, hasError: false, isLoading: true });
            const response = await fetch(ingredientsURL);
            if (!response.ok) {
                throw new Error("Ошибка HTTP: " + response.status);
            }
            const data = await response.json();
            setRequesState({ ...stateRequest, ingredients: data.data, isLoading: false });
            setSuccessed(true);
        } catch (error) {
            // Обработка ошибок
            setRequesState({ ...stateRequest, hasError: true, isLoading: false });
            alert(error.message);
        }
    }
    
      
      useEffect(() => {
        getIngredients();
      }, []);

    return(
        <>
        
            <AppHeader isLoading={stateRequest.isLoading} hasError={stateRequest.hasError}/>

            {  !successed ? (<p>Info loading</p>) : (
            <main className={appStyles.row}>
                <div className='mr-10'>
                    <BurgerIngredients tabs={Tabs} data={stateRequest.ingredients} />
                </div>
                <div>
                    <BurgerConstructor data={stateRequest.ingredients}/>
                </div>
            </main> )}
        </>
    )
}

export default App;