import AppHeader from '../app-header/app-header'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { HomePage, RegisterPage, LoginPage, ProfilePage, ForgotPasswordPage, ResetPasswordPage, ProfileOrdersPage, NotFound404, IngredientDetailPage, FeedPage, OrderPage } from "../../pages"
import { useAppDispatch, useAppSelector } from '../../utils/types/hooks';
import { useEffect } from 'react';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { getUser } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie';
import ProtectedRouteLoginElement from '../protected-route-login';
import ProtectedRouteElement from '../protected-route';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderInfo from '../order-info/order-info';


const App = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
	const access = getCookie('accessToken');
    const location = useLocation();
    const navigate = useNavigate(); 
    const state = location.state as { backgroundLocation: Location }

    const onCloseModal = () => {
        navigate(-1)
      };

    useEffect(() => {
		dispatch(getIngredients())
		
		dispatch(getUser())
		
	}, [dispatch])

    return(
        <>
            <AppHeader/>
            <Routes location={state?.backgroundLocation || location}>
                <Route path="/" element={<HomePage/>} />
                <Route path="/register" element={<ProtectedRouteElement element={<RegisterPage/>} isAuth={!access}/>} />
                <Route path="/login" element={<ProtectedRouteElement element={<LoginPage/>} isAuth={!access}/>} />
                <Route path="/profile" element={<ProtectedRouteLoginElement element={<ProfilePage/>} isAuth={Boolean(access) ?? false }/>} />
                <Route path="/profile/orders" element={<ProtectedRouteLoginElement element={<ProfileOrdersPage/>} isAuth={Boolean(access) ?? false}/>} />
                <Route path="/profile/orders/:id" element={<ProtectedRouteLoginElement element={<OrderPage/>} isAuth={Boolean(access) ?? false}/>} />
                <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage/>} isAuth={!access}/>}/>
                <Route path="/reset-password"  element={<ProtectedRouteElement element={<ResetPasswordPage/>} isAuth={!access && user.forgotPasswordSuccess}/>}/>
                <Route path='/ingredients/:id' element={<IngredientDetailPage />} />
                <Route path='/feed' element={<FeedPage />} />
                <Route path='feed/:id' element={<OrderPage />} />
                <Route path="*" element={<NotFound404/>}/>
            </Routes>
            {state?.backgroundLocation && (
                <Routes>
                    <Route path='/ingredients/:id' element={
                            <Modal header='Детали ингредиента' onCloseModal={onCloseModal}>
                                <IngredientDetails />
                            </Modal>}
                    />
                    <Route path={'/profile/orders/:id'} element={
                        <Modal onCloseModal={onCloseModal}>
                            <OrderInfo />
                        </Modal>
                    } />

                    <Route path={'feed/:id'} element={
                        <Modal onCloseModal={onCloseModal}>
                            <OrderInfo />
                        </Modal>
                    } />
                </Routes>
           
         )}


        </>
    )
}

export default App;
