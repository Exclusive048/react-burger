import { Button, EmailInput, PasswordInput, } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useCallback } from 'react'
import { login } from '../services/actions/user';
import { useForm } from '../hooks/use-form';
import { FC, FormEvent } from 'react';


const LoginPage: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    const { form, onChange } = useForm({ email: '', password: '' })

    const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>)=> {
			e.preventDefault()
			dispatch<any>(login(form))
			navigate(from, { replace: true, state: { from: location.pathname } })
		},
		[dispatch, form]
	)

    return(
        <div className={`${styles.mainContainer} mt-30`}>
            <h1 className={`${styles.formTitle} text text_type_main-medium mb-6 `}>Вход</h1>
            <form name='login' onSubmit={handleSubmit}>
                <div className='mb-6'>
                    <EmailInput
                        name='email'
                        value={form.email ?? ''}
                        onChange={onChange}
                    />
                </div>
                <div className='mb-6'>
                    <PasswordInput
                        value={form.password ?? ''}
                        name='password'
                        onChange={onChange}
                    />
                </div>
                <div className={`${styles.button} mb-20`}>
                    <Button type="primary" size="medium" htmlType='submit'>
                        Войти
                    </Button>
                </div>
            </form>
            <p className={`${styles.textLink} text text_type_main-default text_color_inactive mb-4`}>Вы новый пользователь?
                <Link to={"/register"}className={styles.link}>Зарегистрироваться</Link>
            </p>
            <p className={`${styles.textLink} text text_type_main-default text_color_inactive mb-4`}>Забыли пароль? 
                <Link to={"/forgot-password"}className={styles.link}>Восстановить пароль</Link>
            </p>
            
        </div>
    );
}

export default LoginPage;