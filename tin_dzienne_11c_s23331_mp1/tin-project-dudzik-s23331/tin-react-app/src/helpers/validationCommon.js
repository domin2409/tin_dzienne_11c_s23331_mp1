// export function checkRequired(value) {
//     return false;
// }

//Ustaw flagę, która będzie zmieniana w zależności od poprawności pól formularza (false - formularz niepoprawny):
let valid = true;


//  funkcję czyszczącą formatowanie błędnych pól oraz ich komunikatów:  wcześniej było tu errorInfo
export function resetErrors(inputs,errorText){
    for(let i=0; i< inputs.length; i++){

        inputs[i].classList.remove("error-input")

    }

    for(let i=0; i<errorText.length; i++){
        errorText[i].innerText ="";

    }
    // errorInfo.innerText ="";
}


export function checkForInput(htmlElement, htmlErrorField){
    if(!checkRequired(htmlElement.value)){
        valid = false;
        htmlElement.classList.add("error-input");
        htmlErrorField.innerText = "Pole jest wymagane";

    }
}

export function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }

    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
        return false;
    }

    if (min && length < min) {
        return false;
    }

    return true;
}


// sprawdź czy funkcja jest wymagana??
export function checkRequired(value){
    if (!value){
        return false;
    }
    value = value.toString().trim();
    if (value === ""){
        return false;
    }
    return true;
}
//W3C
export function validateEmail(email) {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
}
