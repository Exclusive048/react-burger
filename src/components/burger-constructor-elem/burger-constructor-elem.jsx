import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorElementStyles from "./burger-constructor-elem.module.css";
import { useDispatch } from 'react-redux'
import { DELETE_INGREDIENT } from '../../services/actions/burger-constructor'
import { MOVE_INGREDIENT } from "../../services/actions/burger-constructor";
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from "prop-types"

const BurgerConstructorElem = ({text, price, id, thumbnail, index }) => {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const deleteIngredient = () => {
        dispatch({
            type: DELETE_INGREDIENT,
            id: id
        });
    };

    const handleMove = (dragIndex, hoverIndex) => {
		dispatch({
			type: MOVE_INGREDIENT,
			dragIndex: dragIndex,
			hoverIndex: hoverIndex
		})
	}

    const [, drop] = useDrop({
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
          
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          
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
            <ConstructorElement text={text} price={price} thumbnail={thumbnail} handleClose={deleteIngredient}/>
        </div>
    )
}

BurgerConstructorElem.propTypes = {
	text: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
	thumbnail: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

export default BurgerConstructorElem;