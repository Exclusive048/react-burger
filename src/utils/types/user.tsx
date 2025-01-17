import { TServerResponse } from "./response";

export type TUser = {
	email: string
	name: string
}


export type TRegisterUser = TUser & { password: string }

export type TLoginUser = {
	email: string
	password: string
}

export type TAuthResponse = TServerResponse<{
	user: TUser
	accessToken: string
	refreshToken: string
}>

export type TUserResponse = TServerResponse<{ user: TUser }>

export type TPassword = {
	password: string
	token: string
}