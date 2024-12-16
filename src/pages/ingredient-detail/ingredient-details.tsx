import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from "./ingredient-details.module.css";

const IngredientDetailPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <p className={`${styles.title} text text_type_main-large`}>
          Детали ингредиента
        </p>
        <IngredientDetails />
      </div>
    </main>
  );
};

export default IngredientDetailPage;
