import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient-detail.module.css';


const IngredientDetailPage = () => {
	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<p className={`${styles.title} text text_type_main-large`}>
					Детали ингредиента
				</p>
				<IngredientDetails/>
			</div>
		</main>
	)
}

export default IngredientDetailPage;