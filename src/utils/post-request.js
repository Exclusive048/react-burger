import { checkResponse } from "./check-response";
const method = "POST";
const headers = new Headers({
  "Content-Type": "application/json; charset=UTF-8",
});

export function postRequest(endpoint, payload) {
  return fetch(endpoint, {
    method,
    headers,
    body: JSON.stringify(payload),
  }).then(checkResponse);
}
