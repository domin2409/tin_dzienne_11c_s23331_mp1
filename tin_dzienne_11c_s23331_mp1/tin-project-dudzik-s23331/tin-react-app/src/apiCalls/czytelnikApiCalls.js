
const baseCzytelnikUrl = 'http://localhost:3000/api/czytelnik';

export function getCzytelnikApiCall() {
    return fetch(baseCzytelnikUrl);
}

export function getCzytelnikByIdApiCall(czytelnikId) {
    return fetch(`${baseCzytelnikUrl}/${czytelnikId}`)
}


export function addCzytelnikApiCall(czytelnik) {
    const czytelnikString = JSON.stringify(czytelnik)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: czytelnikString
    }
    const promise = fetch(baseCzytelnikUrl, options);
    console.log(promise)
    return promise;
}


export function updateCzytelnikApiCall(czytelnikId, czytelnik) {
    const url = `${baseCzytelnikUrl}/${czytelnikId}`
    const czytelnikString = JSON.stringify(czytelnik)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: czytelnikString
    }
    const promise = fetch(url, options);
    return promise;
}
