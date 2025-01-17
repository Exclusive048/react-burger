import { TServerResponse } from "./response"

export type TOrderDetails = { 
    readonly orderIdentifier: number 
}

export type TOrder = {
	name: string
	order: {number: number}
} | null

export type TOrderResponse = TServerResponse<TOrder>


export type TOrderItem = {
	_id: string
	ingredients: Array<string>
	status: string
	name: string
	createdAt: string | number | Date
	updatedAt: string
	number: number
}

export type TGetOrderResponse = TServerResponse<TOrdersList>

export type TOrdersList = {
	
    orders: Array<TOrderItem>;
    total: number;
    totalToday: number;
}