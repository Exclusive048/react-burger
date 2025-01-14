import { ReactNode } from 'react';

export type TModal = {
	onCloseModal: () => void
	header?: string
    children: ReactNode
}


export type TModalShort = Omit<TModal, 'header' | 'children'>