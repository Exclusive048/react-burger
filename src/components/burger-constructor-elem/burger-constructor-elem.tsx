import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorElementStyles from "./burger-constructor-elem.module.css";
import { useDispatch } from "react-redux";
import { DELETE_INGREDIENT, MOVE_INGREDIENT } from "../../services/actions/burger-constructor";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface BurgerConstructorElemProps {
  text: string;
  price: number;
  id: string;
  thumbnail: string;
  index: number;
}

const BurgerConstructorElem: React.FC<BurgerConstructorElemProps> = ({ text, price, id, thumbnail, index }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const deleteIngredient = () => {
    dispatch({ type: DELETE_INGREDIENT, id });
  };

  const handleMove = (dragIndex: number, hoverIndex: number) => {
    dispatch({ type: MOVE_INGREDIENT, dragIndex, hoverIndex });
  };

  const [, drop] = useDrop({
    accept: "constructorIngredient",
    hover(item: any, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      handleMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructorIngredient",
    item: { id, index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className={`${burgerConstructorElementStyles.ingredientElem} ml-4 mr-4 mb-4`}
    >
      <DragIcon type="primary" />
      <ConstructorElement text={text} price={price} thumbnail={thumbnail} handleClose={deleteIngredient} />
    </div>
  );
};

export default BurgerConstructorElem;
