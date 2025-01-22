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

export const requestWithToken = async <T>(
    endpoint: string,
    method: string,
    payload?: TPayload
): Promise<T> => {
    const createHeaders = () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie('accessToken')}`,
    });

    const checkResponse = async (response: Response): Promise<T> => {
        if (!response.ok) {
            throw await response.json(); 
        }
        return response.json();
    };

    const makeRequest = async (): Promise<T> => {
        const headers = createHeaders();
        return method === "PATCH" || method === "POST"
            ? await fetch(endpoint, {
                  method: method,
                  headers,
                  body: JSON.stringify(payload), 
              }).then(checkResponse)
            : await fetch(endpoint, {
                  method: method,
                  headers,
              }).then(checkResponse);
    };

    try {
        return await makeRequest();
    } catch (err) {
        if ((err as { message: string }).message === "jwt expired") {
            
            const refreshData = await postRequest<TRefreshResponse>(resetTokenEndpoint, {
                token: getCookie("refreshToken"),
            });
            setCookie("accessToken", refreshData.accessToken.split("Bearer ")[1]); 
            setCookie("refreshToken", refreshData.refreshToken); 

            return await makeRequest(); 
        } else {
            return Promise.reject(err); 
        }
    }
};