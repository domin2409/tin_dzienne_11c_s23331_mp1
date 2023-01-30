import {getCurrentUser, getToken} from "../helpers/authHelper";

const baseCzytelnikUrl = 'http://localhost:3000/api/czytelnik';

export function getCzytelnikApiCall() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }}
        return fetch(baseCzytelnikUrl, options);
}

export function getCzytelnikByIdApiCall(czytelnikId) {
    return fetch(`${baseCzytelnikUrl}/${czytelnikId}`)
}


export function addCzytelnikApiCall(czytelnik) {
    const user = getCurrentUser()
    const czytelnikString = JSON.stringify(czytelnik)
    let token
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: czytelnikString
    }
    const promise = fetch(baseCzytelnikUrl, options);
    return promise;
}


export function updateCzytelnikApiCall(czytelnikId, czytelnik) {
    const url = `${baseCzytelnikUrl}/${czytelnikId}`
    const czytelnikString = JSON.stringify(czytelnik)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        body: czytelnikString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteCzytelnikApiCall(czytelnikId) {

    const url = `${baseCzytelnikUrl}/${czytelnikId}`

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    }
    return fetch(url, options);
}