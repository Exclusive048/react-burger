import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


const App = () => {
    
    return(
        <>
            <AppHeader/>
            <main className={appStyles.row}>
                <DndProvider backend={HTML5Backend}>
                <div className='mr-10'>
                    <BurgerIngredients/>
                </div>
                <div>
                    <BurgerConstructor/>
                </div> 
                </DndProvider>
            </main>
        </>
    )
}

export default App;