import { FC } from 'react';
import { TOrderItem, TOrdersList } from '../../utils/types/order';
import OrdersListItem from '../order-list-item/order-list-item';
import styles from './order-list.module.css'


type TOrderData = {
    data: TOrdersList
};

const OrdersList: FC<TOrderData> = ({ data }) => {
    return (
		<main className={`${styles.main} mt-4`}>
			<div className={`${styles.containerOrder}`}>
				{data.orders && data.orders.map((elem: TOrderItem, index: number) =>
					<OrdersListItem key={index} order={elem} />
				)}
			</div>
		</main>
    );
}

export default OrdersList;