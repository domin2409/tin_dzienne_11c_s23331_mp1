import {
    addCzytelnikApiCall,
    getCzytelnikApiCall,
    getCzytelnikByIdApiCall,
    updateCzytelnikApiCall
} from "../../apiCalls/czytelnikApiCalls";
import {getKsiazkaApiCall} from "../../apiCalls/ksiazkaApiCalls";
import FormMode from '../../helpers/FormHelper'
import FormButtons from '../form/FormButtons'
import {useEffect, useState} from "react";
import {useParams, useNavigate, } from "react-router-dom";
import {checkRequired, checkTextLengthRange} from '../../helpers/validationCommon'


function CzytelnikForm(){
    const [czytelnik, setCzytelnik] = useState({
        'imie': '',
        'nazwisko': '',
        'data_dolaczenia': ''
    })
    const [errors, setErrors] = useState({
        'imie': '',
        'nazwisko': '',
        'data_dolaczenia': ''
    })


    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)


    const { czytelnikId } = useParams()
    const currentFormMode = czytelnikId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate();
    const pageTitle = currentFormMode === FormMode.NEW ? 'Dodaj nowego czytelnika' : 'Edytuj dane czytelnika';
    const submitButtonLabel = currentFormMode === FormMode.NEW ? 'Add' : 'Edit';
    const cancelPath = "/czytelnik"

    const errorsSummary = hasErrors() ? 'Form contains errors' : '';
    const fetchError = error ? `Error: ${error.message}` : '';
    const globalErrorMessage = errorsSummary || fetchError || message;



    useEffect(() => {
        if (currentFormMode === FormMode.EDIT) {
            fetchCzytelnikDetails()
        }
    }, [])
    useEffect(() => {
        if (redirect) {
            navigate('/czytelnik')
        }
    }, [redirect])

    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form">
                <label htmlFor="firstName">Imię: <span className="symbol-required">*</span></label>
                <input type="text" name="firstName" id="firstName" required />
                    <span id="errorFirstName"></span>

                    <label htmlFor="lastName">Nazwisko: <span className="symbol-required">*</span></label>
                    <input type="text" name="lastName" id="lastName" required/>
                        <span id="errorLastName"></span>

                        <label htmlFor="date">Data dołączenia <span className="symbol-required">*</span></label>
                        <input type="date" name="date" id="date"  required/>
                            <span id="errorDate"></span>

                <FormButtons
                    error={globalErrorMessage}
                    submitButtonLabel={submitButtonLabel}
                    cancelPath={cancelPath} />
            </form>
        </main>
    )


    function fetchCzytelnikDetails() {
        getCzytelnikByIdApiCall(czytelnikId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setCzytelnik(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                })
    }

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setCzytelnik({
            ...czytelnik,
            [name]: value
        })
    }
    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'firstName') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane.'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków.'
            }
        }
        if (fieldName === 'lastName') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        if (fieldName === 'date') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            }
        }
        return errorMessage;
    }



    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addCzytelnikApiCall(czytelnik)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateCzytelnikApiCall(czytelnikId, czytelnik)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        }
                    )
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                const serverFieldsErrors = {...errors}
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    serverFieldsErrors[fieldName] = errorMessage
                                }
                                setErrors(serverFieldsErrors)
                                setError(null)
                            } else {
                                setRedirect(true)
                            }
                        },
                        (error) => {
                            setError(error)
                        }
                    )
            }
        }
    }




    function validateForm() {
        let isValid = true
        let serverFieldsErrors = {...errors}
        Object.entries(czytelnik).forEach(([key, value]) => {
            const errorMessage = validateField(key, value)
            serverFieldsErrors[key] = errorMessage
            if (errorMessage.length > 0) {
                isValid = false
            }
        })
        setErrors(serverFieldsErrors)
        return isValid
    }

    function hasErrors() {
        Object.values(errors).forEach((value) => {
            if (value.length > 0) {
                return true
            }
        })
        return false
    }













} export default CzytelnikForm