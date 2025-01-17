// Импорты вспомогательных функций для работы с cookies
import { getCookie, setCookie } from "./cookie";
import { baseURL } from './base-url';

// Типы для ответа от сервера на обновление токена
export interface TRefreshResponse {
    accessToken: string;
    refreshToken: string;
}

// Типы для тела запроса
export type TPayload = Record<string, unknown>;

// Метод для обновления токена
export const refreshToken = async (): Promise<TRefreshResponse> => {
    const refreshTokenEndpoint = `${baseURL}/auth/token`;

    // Получаем refreshToken из cookies
    const refreshTokenData = {
        token: getCookie("refreshToken"),
    };

    try {
        const response = await fetch(refreshTokenEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(refreshTokenData),
        });

        if (!response.ok) {
            throw new Error("Failed to refresh token");
        }

        const refreshData: TRefreshResponse = await response.json();

        // Сохраняем обновленные токены в cookies
        setCookie("accessToken", refreshData.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", refreshData.refreshToken);

        return refreshData;
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
    }
};

// Основной метод для выполнения запросов с использованием токена
export const requestWithToken = async <T>(
    endpoint: string,
    method: string,
    payload?: TPayload
): Promise<T> => {
    // Создаем заголовки для запроса
    const createHeaders = (): Record<string, string> => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`, // Достаем токен из cookies
    });

    // Проверка ответа от сервера
    const checkResponse = async (response: Response): Promise<T> => {
        if (!response.ok) {
            throw await response.json();
        }
        return response.json();
    };

    // Функция для выполнения запроса
    const makeRequest = async (): Promise<T> => {
        const headers = createHeaders();
        return method === "PATCH" || method === "POST"
            ? await fetch(endpoint, {
                  method,
                  headers,
                  body: JSON.stringify(payload),
              }).then(checkResponse)
            : await fetch(endpoint, {
                  method,
                  headers,
              }).then(checkResponse);
    };

    try {
        // Выполняем запрос
        return await makeRequest();
    } catch (err) {
        // Проверяем, истек ли токен
        if ((err as { message: string }).message === "jwt expired") {
            console.warn("Access token expired. Attempting to refresh...");

            // Обновляем токен через метод refreshToken
            await refreshToken();

            // Повторяем запрос с обновленным токеном
            return await makeRequest();
        } else {
            console.error("Request failed:", err);
            return Promise.reject(err); // Пробрасываем ошибку дальше
        }
    }
};
