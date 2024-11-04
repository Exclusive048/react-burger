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

   /* const getIngredients = () => {
        setState({ ...state, hasError: false, isLoading: true });
        fetch(ingredientsURL)
          .then(res => res.json())
          .then(data => 
            { setState({ ...state, ingredients:data.data, isLoading: false })
                setSuccessed(true)  
            })
          .catch(e => {
            setState({ ...state, hasError: true, isLoading: false });
          });
      };*/

      async function getIngredients (){
        setRequesState({ ...stateRequest, hasError: false, isLoading: true });
        let response = await fetch(ingredientsURL);
        if (response.ok) {
            let data = await response.json();
            setRequesState({ ...stateRequest, ingredients:data.data, isLoading: false })
            setSuccessed(true);
        } 
        else {
            setRequesState({ ...stateRequest, hasError: true, isLoading: false });
            alert("Ошибка HTTP: " + response.status);
        }
      }
      
      useEffect(() => {
        getIngredients();
      }, []);

    return(
        <>
        
            <AppHeader isLoading={stateRequest.isLoading} hasError={stateRequest.hasError}/>

            {  !successed ? (<p>Info loading</p>) : (
            <section className={appStyles.row}>
                <div className='mr-10'>
                    <BurgerIngredients tabs={Tabs} data={stateRequest.ingredients} />
                </div>
                <div>
                    <BurgerConstructor data={stateRequest.ingredients}/>
                </div>
            </section> )}
        </>
    )
}

export default App;