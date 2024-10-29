import React from "react";
import { Logo, Icons, BurgerIcon, ListIcon, ProfileIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css';

const AppHeader = () => {

    return(
        <header className={headerStyles.header}>
            <nav className={headerStyles.nav}>
                <div className={headerStyles.headerItem}>
                    <button className={headerStyles.headerButton}>
                        <BurgerIcon></BurgerIcon>
                        <span>Конструктор</span>
                    </button>
                </div>
                <div className={headerStyles.headerItem}>
                    <button className={headerStyles.headerButton}>
                        <ListIcon></ListIcon>
                        <span>Лента заказов</span>
                    </button>
                </div>
                <div className={headerStyles.logoContainer}>
                    <Logo></Logo>
                </div>
                <div className={headerStyles.headerItem}>
                    <button className={headerStyles.headerButton}>
                        <ProfileIcon></ProfileIcon>
                        <span>Личный кабинет</span>
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;