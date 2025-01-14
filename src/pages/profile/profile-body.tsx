import { Button, Input, PasswordInput,} from '@ya.praktikum/react-developer-burger-ui-components';
import profileBodyStyle from './profile.module.css';
import { useEffect, FC, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/types/hooks'
import { patchUser } from '../../services/actions/user';
import { useForm } from '../../hooks/use-form';


const ProfileBody: FC = () => {
	const dispatch = useAppDispatch();
	const userCurrentData = useAppSelector(state => state.user.user);
	const { form, onChange, setValue } = useForm({
		name: '',
		email: '',
		password: '',
	})

	useEffect(() => {
		if (userCurrentData) {
			setValue({
				...form,
				email: userCurrentData.email,
				name: userCurrentData.name,
				password: "",
			})
		}
	}, [userCurrentData])

	
	const handleCancel = () => {
		setValue({
			...form,
			email: userCurrentData?.email,
			name: userCurrentData?.name,
			password: "",
		})
	}
	const handleSubmit = (e: FormEvent<HTMLFormElement> )=> {
		e.preventDefault()
		dispatch(patchUser(form.name as string, form.email as string, form.password as string))
	}
	
    return (
        <form className={profileBodyStyle.form} onSubmit={handleSubmit} >
            <Input
				type='text'
				name='name'
				placeholder='Имя'
				onChange={onChange}
				value={form.name ?? ""}
				icon={'EditIcon'} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}			/>
			<Input
				type='email'
				name='login'
				placeholder='Логин'
				onChange={onChange}
				value={form.email ?? ""}
				icon={'EditIcon'} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}			/>
			<PasswordInput
				name='password'
				onChange={onChange}
				value={form.password ?? ""}
			/>
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
        </form>
    )
}

export default ProfileBody;