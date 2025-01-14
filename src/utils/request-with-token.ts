import { getCookie, setCookie } from './cookie';
import { checkResponse } from './check-response';
import { postRequest } from './post-request';
import { baseURL } from './base-url';
import { TRefreshResponse } from './types/response';


const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getCookie("accessToken"),
}

type TPayload = 
	  { name: string; email: string; password: string;} 
	| { ingredients: string[]; }
	| {};


const resetTokenEndpoint = `${baseURL}/auth/token`;

export const requestWithToken = async <T>(endpoint: string, method: string, payload: TPayload) => {
	try{
		return method === "PATCH" || method === "POST" ? 
			 await <T>fetch(endpoint, {
			method: method,
			headers,
			body: JSON.stringify(payload)
		}).then(checkResponse) : 
		await <T>fetch(endpoint, {
			method: method,
			headers,
		}).then(checkResponse);
	}
	catch(err){
		if ((err as { message: string}).message === 'jwt expired') {
			const refreshData = await postRequest<TRefreshResponse>(resetTokenEndpoint, {token:getCookie('refreshToken')})
			setCookie('accessToken', refreshData.accessToken.split('Bearer ')[1])
			setCookie('refreshToken', refreshData.refreshToken)
			headers.Authorization = refreshData.accessToken
			return await <T>fetch(endpoint, {
				method: method,
				headers,
				body: JSON.stringify({
					payload
				}),
			}).then(checkResponse);
		} else {
			return Promise.reject(err)
		}
	}
	
}