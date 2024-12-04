import { getCookie, setCookie } from './cookie';
import { checkResponse } from './check-response';
import { postRequest } from './post-request';
import baseURL from './base-url';


const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getCookie("accessToken"),
}

const resetTokenEndpoint = `${baseURL}/auth/token`;

export const requestWithToken = async (endpoint, method, payload) => {
	try{
		return method === "PATCH" ? 
			 await fetch(endpoint, {
			method: method,
			headers,
			body: JSON.stringify(payload)
		}).then(checkResponse) : 
		await fetch(endpoint, {
			method: method,
			headers,
		}).then(checkResponse);
	}
	catch(err){
		if (err.message === 'jwt expired') {
			const refreshData = await postRequest(resetTokenEndpoint, {token:getCookie('refreshToken')})
			setCookie('accessToken', refreshData.accessToken.split('Bearer ')[1])
			setCookie('refreshToken', refreshData.refreshToken)
			headers.headers.Authorization = refreshData.accessToken
			return await fetch(endpoint, {
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