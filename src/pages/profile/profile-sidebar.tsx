import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import profileNavStyles from './profile.module.css';
import { logout } from '../../services/actions/user';
import { MouseEvent } from 'react';

const ProfileSideBar = () => {
    const dispatch = useDispatch();

    const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch<any>(logout());
    };

    return (
        <nav className={`${profileNavStyles.sidebar} mr-15`}>
            <NavLink
                to="/profile"
                className={`${profileNavStyles.navitem} text text_type_main-medium`}
            >
                {({ isActive }) => (
                    <p className={isActive ? profileNavStyles.active : 'text_color_inactive'}>
                        Профиль
                    </p>
                )}
            </NavLink>
            <NavLink
                to="/profile/orders"
                className={`${profileNavStyles.navitem} text text_type_main-medium`}
            >
                {({ isActive }) => (
                    <p className={isActive ? profileNavStyles.active : 'text_color_inactive'}>
                        История заказов
                    </p>
                )}
            </NavLink>
            <NavLink
                to="/login"
                className={`${profileNavStyles.navitem} text text_type_main-medium text_color_inactive`}
                onClick={handleLogout}
            >
                Выход
            </NavLink>
            <p className="text text_type_main-default text_color_inactive mt-20">
                В этом разделе вы можете изменить свои персональные данные
            </p>
        </nav>
    );
};

export default ProfileSideBar;
