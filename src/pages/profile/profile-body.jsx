import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import profileBodyStyle from './profile.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patchUser } from '../../services/actions/user';
import { useForm } from '../../hooks/use-form';

const ProfileBody = () => {
    const dispatch = useDispatch();
    const userCurrentData = useSelector(state => state.user.user);
    const { form, onChange, setValue } = useForm({
        name: '',
        email: '',
        password: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (userCurrentData) {
            setValue({
                ...form,
                email: userCurrentData.email,
                name: userCurrentData.name,
                password: "",
            });
        }
    }, [userCurrentData]);

    useEffect(() => {
        const isFormEdited =
            form.name !== userCurrentData?.name ||
            form.email !== userCurrentData?.email ||
            form.password !== "";
        setIsEditing(isFormEdited);
    }, [form, userCurrentData]);

    const handleCancel = () => {
        setValue({
            ...form,
            email: userCurrentData.email,
            name: userCurrentData.name,
            password: "",
        });
        setIsEditing(false);
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(patchUser(form.name, form.email, form.password));
        setIsEditing(false);
    };

    return (
        <form className={profileBodyStyle.form} onSubmit={handleSubmit}>
            <Input
                type='text'
                name='name'
                placeholder='Имя'
                onChange={onChange}
                value={form.name ?? ""}
                icon={'EditIcon'}
            />
            <Input
                type='email'
                name='login'
                placeholder='Логин'
                onChange={onChange}
                value={form.email ?? ""}
                icon={'EditIcon'}
            />
            <PasswordInput
                name='password'
                onChange={onChange}
                value={form.password ?? ""}
            />
            {isEditing && ( 
                <div className={profileBodyStyle.button}>
                    <Button
                        type='primary'
                        size='medium'
                        htmlType='button'
                        onClick={handleCancel}
                    >
                        Отмена
                    </Button>
                    <Button type='primary' size='medium' htmlType='submit'>
                        Сохранить
                    </Button>
                </div>
            )}
        </form>
    );
};

export default ProfileBody;
