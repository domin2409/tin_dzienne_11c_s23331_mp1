// import * as common from './validationCommon.js';

function validateForm() {
    console.log("działa")
const BookTitleInput = document.getElementById('BookTitle');
const AuthorFirstNameInput = document.getElementById('AuthorFirstName');
const AuthorLastNameInput = document.getElementById('AuthorLastName');
const BookReleaseDateInput = document.getElementById('BookReleaseDate');

const ErrorBookTitle = document.getElementById('errorBookTitle');
const ErrorAuthorLastName = document.getElementById('errorAuthorLastName');
const ErrorAuthorFirstName = document.getElementById('errorAuthorFirstName');
const ErrorBookReleaseDate = document.getElementById('errorBookReleaseDate');
const ErrorSummary = document.getElementById('errorSummary');

resetErrors([BookTitleInput, AuthorFirstNameInput, AuthorLastNameInput, BookReleaseDateInput],
     [ErrorBookTitle, ErrorAuthorFirstName, ErrorAuthorLastName, ErrorBookReleaseDate, ErrorSummary])


checkForInput(BookTitleInput, ErrorBookTitle);
checkForInput(AuthorFirstNameInput, ErrorAuthorFirstName);
checkForInput(AuthorLastNameInput,ErrorAuthorLastName);
checkForInput(BookReleaseDateInput, ErrorBookReleaseDate);






if(!valid){
    ErrorSummary.innerText ="Formularz zawiera błędy";
}
return valid;

}






