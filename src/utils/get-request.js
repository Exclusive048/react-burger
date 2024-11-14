import { checkResponse } from "./check-response";
export function getRequest(endpoint){
    return fetch(endpoint).then( checkResponse );
}