
const baseKsiazkaUrl = 'http://localhost:3000/api/ksiazka';

export function getKsiazkaApiCall() {
    return fetch(baseKsiazkaUrl);
}

export function getKsiazkaByIdApiCall(ksiazkaId) {
    return fetch(`${baseKsiazkaUrl}/${ksiazkaId}`)
}
