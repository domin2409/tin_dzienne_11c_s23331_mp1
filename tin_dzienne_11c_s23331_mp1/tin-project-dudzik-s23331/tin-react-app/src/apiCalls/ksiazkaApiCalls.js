import {getToken} from "../helpers/authHelper";

const baseKsiazkaUrl = 'http://localhost:3000/api/ksiazka';

export function getKsiazkaApiCall() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    }

    return fetch(baseKsiazkaUrl, options);

}

export function getKsiazkaByIdApiCall(ksiazkaId) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    }

    return fetch(`${baseKsiazkaUrl}/${ksiazkaId}`, options)
}


export function addKsiazkaApiCall(ksiazka) {
    if (ksiazka.waga == null) ksiazka.waga =0;
    const ksiazkaString = JSON.stringify(ksiazka)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        body: ksiazkaString
    }
    const promise = fetch(baseKsiazkaUrl, options);
    console.log(promise)
    return promise;
}


export function updateKsiazkaApiCall(ksiazkaId, ksiazka) {
    const url = `${baseKsiazkaUrl}/${ksiazkaId}`
    const ksiazkaString = JSON.stringify(ksiazka)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        body: ksiazkaString
    }
    const promise = fetch(url, options);
    return promise;
}
export function deleteKsiazkaApiCall(ksiazkaId) {

    const url = `${baseKsiazkaUrl}/${ksiazkaId}`

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    }
    return fetch(url, options);
}
