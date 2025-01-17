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
        Authorization: `Bearer ${getCookie('accessToken')}`, // Берем актуальный токен из cookies
    });

    const checkResponse = async (response: Response): Promise<T> => {
        if (!response.ok) {
            throw await response.json(); // Пробрасываем ошибку с серверным сообщением
        }
        return response.json(); // Явно указываем, что возвращаем данные типа T
    };

    const makeRequest = async (): Promise<T> => {
        const headers = createHeaders();
        return method === "PATCH" || method === "POST"
            ? await fetch(endpoint, {
                  method: method,
                  headers,
                  body: JSON.stringify(payload), // Отправляем payload напрямую
              }).then(checkResponse)
            : await fetch(endpoint, {
                  method: method,
                  headers,
              }).then(checkResponse);
    };

    try {
        return await makeRequest(); // Первая попытка выполнения запроса
    } catch (err) {
        if ((err as { message: string }).message === "jwt expired") {
            // Обновляем токен
            const refreshData = await postRequest<TRefreshResponse>(resetTokenEndpoint, {
                token: getCookie("refreshToken"),
            });
            setCookie("accessToken", refreshData.accessToken.split("Bearer ")[1]); // Сохраняем новый accessToken
            setCookie("refreshToken", refreshData.refreshToken); // Сохраняем новый refreshToken

            return await makeRequest(); // Повторяем запрос с обновленным токеном
        } else {
            return Promise.reject(err); // Пробрасываем остальные ошибки
        }
    }
};