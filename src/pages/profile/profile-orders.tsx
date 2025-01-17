import React from "react";
import { useAppDispatch, useAppSelector } from "../../utils/types/hooks";
import OrdersList from "../../components/order-list/order-list";
import { useEffect } from "react";
import { ORDERS_USER_START, ORDERS_USER_END } from "../../services/actions/constants";
import styles from './profile.module.css';
import { WS_URL } from "../../utils/base-url";
import ProfileSideBar from "./profile-sidebar";

const ProfileOrdersPage = () => {
  const dispatch = useAppDispatch();
  const { connected, error, message } = useAppSelector(state => state.userOrder);

  useEffect(() => {
      dispatch({ type: ORDERS_USER_START, url: `${WS_URL}/orders`, addToken: true });
      return () => {
          dispatch({ type: ORDERS_USER_END });
      }
  }, [dispatch]);

  return (
    <>

    <section className={`${styles.main} mt-20`}>
          <ProfileSideBar isOrderPage={true}/>
          <div className={`${styles.containerOrder}`}>
            {!!error && <p className={`mb-2 error-text text text_type_main-default`}>{error}</p>}
            {!message && <p className={`mt-4 mb-2 error-text text text_type_main-default`}>Страница загружается</p>}
            {connected && !!message && (
                <OrdersList data={message!} />
            )}
          </div>
    </section>
     
    </>
  );
};

export default ProfileOrdersPage;