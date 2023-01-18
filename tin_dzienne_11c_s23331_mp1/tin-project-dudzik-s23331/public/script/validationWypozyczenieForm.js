// import * as common from './validationCommon.js';

function validateForm() {
    console.log("działa")
const BookTitleInput = document.getElementById('BookTitle');
const ReaderInput = document.getElementById('Reader');
const DateInput = document.getElementById('Date');
const ReturnedInput = document.getElementById('Returned');

const ErrorBookTitle = document.getElementById('errorBookTitle');
const ErrorReader = document.getElementById('errorReader');
const ErrorDate = document.getElementById('errorDate');
const ErrorSummary = document.getElementById('errorSummary');

resetErrors([BookTitleInput, ReaderInput, DateInput],
     [ErrorBookTitle, ErrorReader, ErrorDate, ErrorSummary])


checkForInput(BookTitleInput, ErrorBookTitle);
checkForInput(ReaderInput, ErrorReader);
checkForInput(DateInput, ErrorDate);






if(!valid){
    ErrorSummary.innerText ="Formularz zawiera błędy";
}
return valid;

}






