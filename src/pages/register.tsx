import { Button, EmailInput, Input, PasswordInput, } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { useAppDispatch } from '../utils/types/hooks';
import { register } from '../services/actions/user';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/use-form';
import { FC, FormEvent } from 'react';
import { TRegisterUser } from '../utils/types/user';


const RegisterPage: FC = () => {

    const dispatch = useAppDispatch();
    const { form, onChange } = useForm({
		name: '',
		email: '',
		password: '',
	})

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(register(form as TRegisterUser));
    };

    return(
        <div className={`${styles.mainContainer} mt-30`}>
            <h1 className={`${styles.formTitle} text text_type_main-medium mb-6 `}>Регистрация</h1>
            <form name='register' onSubmit={handleSubmit}>
                <div className='mb-6'>
                    <Input
                        placeholder='Имя'
                        name='name'
                        onChange={onChange}
                        value={form.name ?? ''} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    />
                </div>
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
                        Зарегистрироваться
                    </Button>
                </div>
            </form>
            <p className={`${styles.textLink} text text_type_main-default text_color_inactive mb-4`}>Уже зарегистрированы?
                <Link to={"/login"}className={styles.link}>Войти</Link>
            </p>
        </div>
    );
}

export default RegisterPage;