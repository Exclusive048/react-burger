import { checkResponse } from "./check-response";
export function getRequest(endpoint: string): Promise<any>{
    return fetch(endpoint).then( checkResponse );
}