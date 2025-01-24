import { getCookie, setCookie } from "./cookie";
import { baseURL } from './base-url';

export interface TRefreshResponse {
    accessToken: string;
    refreshToken: string;
}

export type TPayload = Record<string, unknown>;

export const refreshToken = async (): Promise<TRefreshResponse> => {
    const refreshTokenEndpoint = `${baseURL}/auth/token`;

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

        setCookie("accessToken", refreshData.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", refreshData.refreshToken);

        return refreshData;
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
    }
};


export const requestWithToken = async <T>(
    endpoint: string,
    method: string,
    payload?: TPayload
): Promise<T> => {
    
    const createHeaders = (): Record<string, string> => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`, 
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

        return await makeRequest();
    } catch (err) {

        if ((err as { message: string }).message === "jwt expired") {
            console.warn("Access token expired. Attempting to refresh...");


            await refreshToken();


            return await makeRequest();
        } else {
            console.error("Request failed:", err);
            return Promise.reject(err);
        }
    }
};
