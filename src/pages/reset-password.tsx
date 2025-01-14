import { Button, Input, PasswordInput, } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { useAppDispatch, useAppSelector } from '../utils/types/hooks';
import { Link, Navigate } from 'react-router-dom';
import { resetPassword } from '../services/actions/user';
import { useForm } from '../hooks/use-form';
import { FC, FormEvent } from 'react';
import { TPassword } from '../utils/types/user';

const ResetPasswordPage: FC = () => {
    const dispatch = useAppDispatch();
    const resetPasswordSuccess = useAppSelector(state => state.user.resetPasswordSuccess );
    
	const { form, onChange } = useForm({
		password: '',
		token: '',
	})


    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(resetPassword(form as TPassword));
    };

    if (resetPasswordSuccess) {
		return <Navigate to={"/login"} />
	}

    return(
        <div className={`${styles.mainContainer} mt-30`}>
            <h1 className={`${styles.formTitle} text text_type_main-medium mb-6 `}>Восстановления пароля</h1>
            <form name='register' onSubmit={handleSubmit}>
                <div className='mb-6'>
                    <PasswordInput
                        name='password'
                        placeholder='Введите новый пароль'
                        onChange={onChange}
                        value={form.password ?? ''}
                    />
                </div>
                <div className='mb-6'>
                    <Input
                        name='name'
                        placeholder='Введите код из письма'
                        onChange={onChange}
                        value={form.token ?? ''} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    />
                </div>
                <div className={`${styles.button} mb-20`}>
                    <Button type="primary" size="medium" htmlType='submit'>
                        Сохарнить
                    </Button>
                </div>
            </form>
            <p className={`${styles.textLink} text text_type_main-default text_color_inactive mb-4`}>Вспомнили пароль?
                <Link to={"/login"} className={styles.link}>Войти</Link>
            </p>
        </div>
    );
}

export default ResetPasswordPage;