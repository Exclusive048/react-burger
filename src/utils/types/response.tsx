export type TServerResponse<T> = {
	success: boolean
} & T

export type TRefreshResponse = TServerResponse<{
	accessToken: string
	refreshToken: string
}>