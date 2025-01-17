import { TypedUseSelectorHook,useDispatch as dispatchHook, useSelector as selectorHook, } from 'react-redux'

import { AppDispatch, RootState } from '../../services/store'

export const useAppDispatch = () => dispatchHook<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook

export type TInputValues = {
	name?: string
	password?: string
	email?: string
	token?: string
}