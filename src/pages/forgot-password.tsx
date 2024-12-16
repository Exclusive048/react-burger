import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom'
import { forgotPassword } from '../services/actions/user';
import { useForm } from '../hooks/use-form';
import { FC, FormEvent } from 'react';

const ForgotPasswordPage: FC = () => {
    const dispatch = useDispatch();
    const forgotPasswordSuccess = useSelector((state:any) => state.user.forgotPasswordSuccess );
    const { form, onChange } = useForm({ email: '' })
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch<any>(forgotPassword(form));
    };

    if (forgotPasswordSuccess) {
		return <Navigate to={"/reset-password"} />
	}

    return(
        <div className={`${styles.mainContainer} mt-30`}>
            <h1 className={`${styles.formTitle} text text_type_main-medium mb-6 `}>Восстановления пароля</h1>
            <form name='forgot-password' onSubmit={handleSubmit}>  
                <div className='mb-6'>
                    <EmailInput
                        name='email'
                        onChange={onChange}
					    value={form.email ?? ''}
                    />
                </div>
                <div className={`${styles.button} mb-20`}>
                    <Button type="primary" size="medium" htmlType='submit'>
                        Восстановить
                    </Button>
                </div>
            </form>
            <p className={`${styles.textLink} text text_type_main-default text_color_inactive mb-4`}>Вспомнили пароль?
                <Link to={"/login"} className={styles.link}>
					Войти
				</Link>
            </p>
        </div>
    );
}

export default ForgotPasswordPage;