
const baseWypozyczenieUrl = 'http://localhost:3000/api/wypozyczenie';

export function getWypozyczenieApiCall() {
    return fetch(baseWypozyczenieUrl);
}

export function getWypozyczenieByIdApiCall(wypozyczenieId) {
    return fetch(`${baseWypozyczenieUrl}/${wypozyczenieId}`)
}
