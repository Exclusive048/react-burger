import { FC } from 'react';
import styles from './order-status.module.css'
import { TOrdersList } from '../../utils/types/order';
type TProp = {
    data: TOrdersList
};

const Statistic: FC<TProp>= ({data}) => {
    
	return (
		<section className='ml-15'>
			<div className={`${styles.status} mb-15`}>
				<div className={`${styles.groupStatus} mr-9`}>
					<h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
					<div className={styles.numbers}>
						{data.orders
							?.slice(0, 10)
							.filter(item => item.status === 'done')
							.map(item => (
								<p
									key={item.number}
									className={`${styles.doneNumber} text text_type_digits-default mb-2`}
								>
									{item.number}
								</p>
							))}
					</div>
				</div>
				<div className={styles.groupStatus}>
					<h3 className='text text_type_main-medium mb-6'>В работе:</h3>
					<div className={styles.numbers}>
						{data.orders
							?.slice(0, 10)
							.filter(item => item.status === 'pending')
							.map(item => (
								<p
									key={item.number}
									className='text text_type_digits-default mb-2'
								>
									{item.number}
								</p>
							))}
					</div>
				</div>
			</div>
			<h3 className='text text_type_main-medium'>Выполнено за все время:</h3>
			<p className={`${styles.number} text text_type_digits-large`}>{data.total}</p>
			<h3 className='text text_type_main-medium mt-15'>
				Выполнено за сегодня:
			</h3>
			<p className={`${styles.number} text text_type_digits-large`}>
				{data.totalToday}
			</p>
		</section>
	)
}

export default Statistic