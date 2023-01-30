import {getToken} from "../helpers/authHelper";

const baseWypozyczenieUrl = 'http://localhost:3000/api/wypozyczenie';

export function getWypozyczenieApiCall() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    }

    return fetch(baseWypozyczenieUrl, options);
}

export function getWypozyczenieByIdApiCall(wypozyczenieId) {
    return fetch(`${baseWypozyczenieUrl}/${wypozyczenieId}`)
}
export function addWypozyczenieApiCall(wypozyczenieId) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    }

    return fetch(`${baseWypozyczenieUrl}/${wypozyczenieId}`, options)
}


export function updateWypozyczenieApiCall(wypozyczenieId, wypozyczenie) {
    const url = `${baseWypozyczenieUrl}/${wypozyczenieId}`
    const wypozyczenieString = JSON.stringify(wypozyczenie)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        body: wypozyczenieString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteWypozyczenieApiCall(ksiazkaId) {

    const url = `${baseWypozyczenieUrl}/${ksiazkaId}`

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    }
    return fetch(url, options);
}
