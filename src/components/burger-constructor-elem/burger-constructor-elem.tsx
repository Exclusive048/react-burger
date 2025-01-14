import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorElementStyles from "./burger-constructor-elem.module.css";
import { useAppDispatch } from "../../utils/types/hooks";
import { deleteIngredient, moveIngredient } from "../../services/actions/burger-constructor";
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { TIngredientItemProps } from "../../utils/types/ingredient";
import { TDragItem } from "../../utils/types/drag-item";
import type { XYCoord } from 'dnd-core'

const BurgerConstructorElem: FC<TIngredientItemProps> = ({name, price, id, image, index }) => {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);

    const delIngredient = () => {
        dispatch(deleteIngredient(id));
    };

    const handleMove = (dragIndex:number, hoverIndex:number) => {
		dispatch(moveIngredient(dragIndex, hoverIndex))
	}

    const [, drop] = useDrop<TDragItem>({
        accept: 'constructorIngredient',
        hover(item, monitor) {
          if (!ref.current) {
            return
          }
          const dragIndex = item.index;
          const hoverIndex = index;
          
          if (dragIndex === hoverIndex) {
            return
          }
          
          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          
          const clientOffset = monitor.getClientOffset();
          
          const hoverClientY = (clientOffset as XYCoord).y  - hoverBoundingRect.top;
          
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
          }
          
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
          }
          
          handleMove(dragIndex, hoverIndex);
          
          item.index = hoverIndex;
        },
    })
    const [{ isDragging }, drag] = useDrag({
    type: 'constructorIngredient',
    item: () => {
        return { id, index }
    },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
    })
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref))

    return (
        <div ref={ref} style={{ opacity }} className={`${burgerConstructorElementStyles.ingredientElem} ml-4 mr-4 mb-4`}>
            <DragIcon type="primary"/>
            <ConstructorElement text={name} price={price} thumbnail={image} handleClose={delIngredient}/>
        </div>
    )
}


export default BurgerConstructorElem;