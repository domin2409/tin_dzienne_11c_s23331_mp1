// export function checkRequired(value) {
//     return false;
// }

//Ustaw flagę, która będzie zmieniana w zależności od poprawności pól formularza (false - formularz niepoprawny):
let valid = true;


//  funkcję czyszczącą formatowanie błędnych pól oraz ich komunikatów:  wcześniej było tu errorInfo
function resetErrors(inputs,errorText){
    for(let i=0; i< inputs.length; i++){

        inputs[i].classList.remove("error-input")

    }

    for(let i=0; i<errorText.length; i++){
        errorText[i].innerText ="";

    }
    // errorInfo.innerText ="";
}


function checkForInput(htmlElement, htmlErrorField){
    if(!checkRequired(htmlElement.value)){
        valid = false;
        htmlElement.classList.add("error-input");
        htmlErrorField.innerText = "Pole jest wymagane";

    }
}

function checkTextLengthRange(htmlElement, htmlErrorField, lengthMin, lengthMax ){
    let correctRange = true;
    if(!htmlElement.value){

        valid = false;
        correctRange = false;
    }
    let value = htmlElement.value.toString().trim();
    const length = value.length;
    if (lengthMax && length> lengthMax){
        valid = false;
        correctRange = false;
    }
    if (lengthMin && length< lengthMin){
        valid = false;
        correctRange = false;
    }
    if (!correctRange ){
        htmlElement.classList.add("error-input");
        htmlErrorField.innerText = "Pole powinno zawierać od "+lengthMin+ " do "+lengthMax+" znaków";
    }
}


// sprawdź czy funkcja jest wymagana??
function checkRequired(value){
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
function validateEmail(email) {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
}
