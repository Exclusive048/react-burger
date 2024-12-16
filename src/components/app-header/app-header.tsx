import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css';
import { useLocation , NavLink, Link } from "react-router-dom";


const iconType = (link : string, active : string) => {
    if (active === link) return "primary";
    return "secondary";
 };

 const colorTextType = (link : string, active : string) => {
    if (active === link) return headerStyles.menuItemText;
    return headerStyles.colorTitle;

 }
const AppHeader = () => {

    const location = useLocation(); 
    return(
        <header className={headerStyles.header}>
            <nav className={headerStyles.nav}>
                <div className={`${headerStyles.leftPosition} ${headerStyles.fullHeight} `}>
                    <NavLink to="/" className={`${headerStyles.menuItem} p-4 mr-2`}>
                        <BurgerIcon type={iconType("/", location.pathname)}/>
                        <span className={`${colorTextType("/", location.pathname)} text text_type_main-default ml-2`}>Конструктор</span>
                    </NavLink>
                    <NavLink to="/profile/orders" className={`${headerStyles.menuItem} p-4`}>
                        <ListIcon type={iconType("/profile/orders", location.pathname)}/>
                        <span className={`${colorTextType("/profile/orders", location.pathname)} ${headerStyles.colorTitle} text text_type_main-default ml-2`}>Лента заказов</span>
                    </NavLink>
                </div>
                <div className={`${headerStyles.centerPosition} ${headerStyles.fullHeight}`}>
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <div className={`${headerStyles.rightPosition} ${headerStyles.fullHeight} `}>
                    <NavLink to="/profile" className={`${headerStyles.menuItem} p-4 mr-2`}>
                        <ProfileIcon  type={iconType("/profile", location.pathname)}/>
                        <span className={`${colorTextType("/profile", location.pathname)} ${headerStyles.colorTitle} text text_type_main-default  ml-2`}>Личный кабинет</span>
                    </NavLink>
                </div>
            </nav> 
        </header> 
    )
}

export default AppHeader;