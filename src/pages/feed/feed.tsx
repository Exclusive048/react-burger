import OrderList from "../../components/order-list/order-list";
import { useAppSelector, useAppDispatch } from "../../utils/types/hooks";
import { ORDERS_ALL_START, ORDERS_ALL_END } from "../../services/actions/constants";
import { WS_URL } from "../../utils/base-url";
import { useEffect } from "react";
import Statistic from "../../components/order-status/order-status";
import styles from './feed.module.css';


const FeedPage = () => {
    const dispatch = useAppDispatch();
    const { connected, error, message } = useAppSelector(state => state.feed);
    useEffect(() => {
        dispatch({ type: ORDERS_ALL_START, url: `${WS_URL}/orders/all` });
        return () => {
            dispatch({ type: ORDERS_ALL_END });
        }
    }, [dispatch]);
    return (
		<main className={styles.main}>
            {!!error && <p className="mb-2 error-text text text_type_main-default">{error}</p>}
            {!message && <p className="mt-4 mb-2 error-text text text_type_main-default">Лента загружается</p>}
            {connected && !!message &&
				<>
					<h1 className='text text_type_main-large mb-5 mt-10'>
						Лента заказов
					</h1>
					<div className={styles.container}>
						<OrderList data={message}/>
						<Statistic data={message}/>
					</div>
				</>
        }
		</main>
	)
}

export default FeedPage;