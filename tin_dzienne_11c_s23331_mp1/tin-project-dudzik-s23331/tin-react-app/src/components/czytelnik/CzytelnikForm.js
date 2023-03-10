import {
    addCzytelnikApiCall,
    getCzytelnikApiCall,
    getCzytelnikByIdApiCall,
    updateCzytelnikApiCall
} from "../../apiCalls/czytelnikApiCalls";
import {getKsiazkaApiCall} from "../../apiCalls/ksiazkaApiCalls";
import FormMode, {formValidationKeys, getValidationErrorKey} from '../../helpers/FormHelper'
import FormButtons from '../form/FormButtons'
import {useEffect, useState} from "react";
import {useParams, useNavigate, } from "react-router-dom";
import {checkRequired, checkTextLengthRange} from '../../helpers/validationCommon'
// import { formValidationKeys } from '../../helpers/formHelper'
import {useTranslation} from "react-i18next";
import {getFormattedDate} from "../../helpers/dateHelper";


function CzytelnikForm(){
    const [czytelnik, setCzytelnik] = useState({
        'imie': '',
        'nazwisko': '',
        'data_dolaczenia': '',
        'email': '',
        'password': ''
    })
    const [errors, setErrors] = useState({
        'imie': '',
        'nazwisko': '',
        'data_dolaczenia': '',
        'email': '',
        'password': ''
    })

    const { t } = useTranslation();

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)


    const { czytelnikId } = useParams()
    const currentFormMode = czytelnikId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate();
    const pageTitle = t(`czytelnik.form.${currentFormMode=== FormMode.NEW ? 'add' : 'edit'}.pageTitle`);
    // const pageTitle = currentFormMode === FormMode.NEW ? t('czytelnik.list.addNew') : t('czytelnik.edit.pageTitle');
    const submitButtonLabel = currentFormMode === FormMode.NEW ? 'Add' : 'Edit';
    const cancelPath = "/czytelnik"

    const errorsSummary = hasErrors() ? 'Form contains errors' : '';
    const fetchError = error ? `Error: ${error.message}` : '';
    const globalErrorMessage = errorsSummary || fetchError || message;


    let translatedErrorMessage = ''
    if (error) {
        const errorKey = getValidationErrorKey(error)
        translatedErrorMessage = t(errorKey)
    }


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

    let content;

    if (!isLoaded && currentFormMode === FormMode.EDIT) {
        content = "Pobieranie danych czytelnik??w...";
    } else {
        content = (
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="imie">{t('czytelnik.fields.imie')} <span className="symbol-required">*</span></label>
                <input type="text" name="imie" id="imie" required onChange={handleChange} value={czytelnik.imie}/>
                    <span id="errorimie">{errors.imie}</span>

                    <label htmlFor="nazwisko">{t('czytelnik.fields.nazwisko')} <span className="symbol-required">*</span></label>
                    <input type="text" name="nazwisko" id="nazwisko" required onChange={handleChange} value={czytelnik.nazwisko}/>
                        <span id="errornazwisko">{errors.nazwisko}</span>

                        <label htmlFor="data_dolaczenia">{t('czytelnik.fields.data_dolaczenia')} <span className="symbol-required">*</span></label>
                        <input type="date" name="data_dolaczenia" id="data_dolaczenia"  required onChange={handleChange} value={getFormattedDate(czytelnik.data_dolaczenia)}/>
                            <span id="errorDate">{errors.data_dolaczenia}</span>

                <label htmlFor="email">{t('czytelnik.fields.email')} <span className="symbol-required">*</span></label>
                <input type="text" name="email" id="email" required onChange={handleChange} value={czytelnik.email}/>
                <span id="erroremail">{errors.email}</span>

                <label htmlFor="password">{t('czytelnik.fields.password')} <span className="symbol-required">*</span></label>
                <input type="text" name="password" id="password" required onChange={handleChange} value={czytelnik.password}/>
                <span id="errorpassword">{errors.password}</span>

                <FormButtons
                    error={globalErrorMessage}
                    submitButtonLabel={submitButtonLabel}
                    cancelPath={cancelPath} />
            </form>
    )
}
    return (
        <main>
            <h2>{pageTitle}</h2>
            {content}
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
        if (fieldName === 'imie') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if (fieldName === 'nazwisko') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if (fieldName === 'data_dolaczenia') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        if (fieldName === 'email') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if (fieldName === 'password') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
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