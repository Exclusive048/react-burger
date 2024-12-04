import homeStyles from './home.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';

import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


const HomePage = () => {
    return(
        <>
            <main className={homeStyles.row}>
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

export default HomePage;