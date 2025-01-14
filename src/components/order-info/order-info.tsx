import { useMemo, FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { getOrderAction } from '../../services/actions/get-order';
import { useAppSelector, useAppDispatch } from '../../utils/types/hooks';
import { TIngredient, TIngredientQty } from '../../utils/types/ingredient';
import styles from './order-info.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderInfo: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderAction(id));
  }, [dispatch, id]);

  const { order } = useAppSelector(state => state.getOrder);
  const { ingredients } = useAppSelector(state => state.ingredients);

  const orderIngredients = useMemo(
    () => {
      if (order === null) {
        return null;
      }
      let group: Record<string, TIngredientQty> = {};
      for (let item of order!.ingredients) {
        let ingredient = ingredients.find((elem: TIngredient) => elem._id === item);
        if (ingredient) {
          if (!group[item]) {
            group[item] = {...ingredient, qty: 0};
          }
          group[item].qty += 1;
        }
      }
      let res: Array<TIngredientQty> = [];
      for (let item of order!.ingredients) {
        if (group[item]) {
          res.push(group[item]);
          delete group[item];
        }
      }
      console.log( 'res', res)
      return res;
    }, [ingredients, order]
  );

  const orderAmount = useMemo(
    () => {
      if (orderIngredients === null) {
        return null;
      }
      return orderIngredients!.reduce((amount: number, elem: TIngredient | undefined) => elem!.price + amount, 0)
    }, [orderIngredients]
  );

  const orderStatus = useMemo(
    () => {
      if (order === null) {
        return null;
      }
      return order!.status === 'done' ? 'Выполнен': 
      order!.status === 'created' ? 'Создан' : 'Готовится'
    }, [order]
  );

  return (
    <main className={styles.main_container}>
      {order &&
        <>
          <p className={`text text_type_digits-default mt-4 mb-10 ${styles.orderNr}`}>
            #{order!.number}
          </p>
          <p className={`text text_type_main-medium mb-3`}>
            {order!.name}
          </p>
          <p className={`text text_type_main-default mb-10 ${styles.orderStatus}`}>
            {orderStatus}
          </p>
          <p className="text text_type_main-medium mb-2">
            {'Состав:'}
          </p>
          <section className={styles.orderBackground}>
            {orderIngredients && orderIngredients.map((item, i: number) => {
              return (
                <li key={i} className="mt-4 mr-6">
                  <div className={styles.rowIngredient}>
                    <div className={styles.imageName}>
                      <div className={styles.imageBackground}>
                        <img src={item!.image_mobile} alt={item!.name} />
                      </div>
                      <p className={`text text_type_main-default ml-4`}>{item.name}</p>
                    </div>
                    <div className={styles.price}>
                      <span className="text text_type_digits-default mr-2">{`${item.qty} x ${item.price}`}</span>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                </li>
              )
            })}
          </section>
          <section className={`text text_type_main-default mt-10 mb-6 ${styles.dateOrder}`}>
            <p className='text text_type_main-default text_color_inactive'>
              <FormattedDate date={new Date(order!.createdAt)} className='text text_type_main-default text_color_inactive' />
            </p>

            <div className={styles.price}>
              <span className={`text text_type_digits-default mr-2`}>{orderAmount}</span>
              <CurrencyIcon type="primary" />
            </div>
          </section>
        </>
      }
    </main>
  );
}

export default OrderInfo;