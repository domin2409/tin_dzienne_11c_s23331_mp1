

function validateForm() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const DateInput = document.getElementById('date');

    const ErrorFirstName = document.getElementById('errorFirstName');
    const ErrorLastName = document.getElementById('errorLastName');
    const ErrorDate = document.getElementById('errorDate');
    const ErrorSummary = document.getElementById('errorSummary');

    resetErrors([firstNameInput, lastNameInput, DateInput],
        [ErrorFirstName, ErrorLastName, ErrorDate, ErrorSummary])


    checkForInput(firstNameInput, ErrorFirstName);
    checkForInput(lastNameInput, ErrorLastName);
    checkForInput(DateInput, ErrorDate);

    if(!valid){
        ErrorSummary.innerText ="Formularz zawiera błędy";
    }
    return valid;

}


