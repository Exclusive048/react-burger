import { NavLink } from 'react-router-dom';
import profileNavStyles from './profile.module.css';
import { logout } from '../../services/actions/user';
import { FC } from 'react';
import { useAppDispatch } from '../../utils/types/hooks';

type props = {
	isOrderPage: boolean
}

const ProfileSideBar: FC<props> = (props) => {
	const dispatch = useAppDispatch()
	const handleLogout = (e: React.SyntheticEvent) => {
		e.preventDefault()
		dispatch(logout())
	}
	let info = "";
    if (props.isOrderPage) {
        info = "В этом разделе вы можете просмотреть свою историю заказов";
    } else {
        info = "В этом разделе вы можете изменить свои персональные данные";
    } 
    
	return (
		<nav className={`${profileNavStyles.sidebar} mr-15`}>
			<NavLink
				to={"/profile"}
				className={`${profileNavStyles.navitem} text text_type_main-medium`}
			>
				{({ isActive }) => (
					<p className={!props.isOrderPage ? profileNavStyles.active : 'text_color_inactive'}>
						Профиль
					</p>
				)}
			</NavLink>
			<NavLink
				to='/profile/orders'
				className={`${profileNavStyles.navitem} text text_type_main-medium`}
			>
				{({ isActive }) => (
					<p className={props.isOrderPage ? profileNavStyles.active : 'text_color_inactive'}>
						История заказов
					</p>
				)}
			</NavLink>
			<NavLink
				to={"/login"}
				className={`${profileNavStyles.navitem} text text_type_main-medium text_color_inactive`}
				onClick={handleLogout}
			>
				Выход
			</NavLink>
			<p
				className={"text text_type_main-default text_color_inactive mt-20"}
			>
				{info}
			</p>
		</nav>
	)
}

export default ProfileSideBar