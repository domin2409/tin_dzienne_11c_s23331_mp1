import {
    addKsiazkaApiCall,
    getKsiazkaApiCall,
    getKsiazkaByIdApiCall,
    updateKsiazkaApiCall
} from "../../apiCalls/ksiazkaApiCalls";
import FormMode from '../../helpers/FormHelper'
import FormButtons from '../form/FormButtons'
import {useEffect, useState} from "react";
import {useParams, useNavigate, } from "react-router-dom";
import {checkRequired, checkTextLengthRange} from '../../helpers/validationCommon'
import {useTranslation} from "react-i18next";
import {getFormattedDate} from "../../helpers/dateHelper";


function KsiazkaForm(){
    const [ksiazka, setKsiazka] = useState({
        'tytul': '',
        'autor_imie': '',
        'autor_nazwisko': '',
        'waga': '0',
        'data_wydania': ''
    })
    const [errors, setErrors] = useState({
        'tytul': '',
        'autor_imie': '',
        'autor_nazwisko': '',
        'waga': '',
        'data_wydania': ''
    })

    const { t } = useTranslation();

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)


    const { ksiazkaId } = useParams()
    const currentFormMode = ksiazkaId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate();
    const pageTitle = t(`ksiazka.form.${currentFormMode=== FormMode.NEW ? 'add' : 'edit'}.pageTitle`);
    const submitButtonLabel = currentFormMode === FormMode.NEW ? 'Add' : 'Edit';
    const cancelPath = "/ksiazka"

    const errorsSummary = hasErrors() ? 'Form contains errors' : '';
    const fetchError = error ? `Error: ${error.message}` : '';
    const globalErrorMessage = errorsSummary || fetchError || message;



    useEffect(() => {
        if (currentFormMode === FormMode.EDIT) {
            fetchKsiazkaDetails()
        }
    }, [])
    useEffect(() => {
        if (redirect) {
            navigate('/ksiazka')
        }
    }, [redirect])

    let content;
    if (!isLoaded && currentFormMode === FormMode.EDIT) {
        content = "Pobieranie danych książek...";
    } else {
        content = (
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="tytul">{t('ksiazka.fields.tytul')}: <span className="symbol-required">*</span></label>
                <input type="text" name="tytul" id="tytul" required onChange={handleChange} value={ksiazka.tytul}/>
                <span id="errortytul"></span>

                <label htmlFor="autor_imie">{t('ksiazka.fields.autor_imie')}: <span className="symbol-required">*</span></label>
                <input type="text" name="autor_imie" id="autor_imie" required onChange={handleChange} value={ksiazka.autor_imie}/>
                <span id="errorAutorImie"></span>

                <label htmlFor="autor_nazwisko">{t('ksiazka.fields.autor_nazwisko')}: <span className="symbol-required">*</span></label>
                <input type="text" name="autor_nazwisko" id="autor_nazwisko" required onChange={handleChange} value={ksiazka.autor_nazwisko}/>
                <span id="errorAutorNazwisko"></span>

                <label htmlFor="waga">{t('ksiazka.fields.waga')}: <span className=""></span></label>
                <input type="number" name="waga" id="waga" onChange={handleChange} value={ksiazka.waga}/>
                <span id="errorWaga"></span>

                <label htmlFor="data_wydania">{t('ksiazka.fields.data_wydania')} <span className="symbol-required">*</span></label>
                <input type="date" name="data_wydania" id="data_wydania"  required onChange={handleChange} value={getFormattedDate(ksiazka.data_wydania)}/>
                <span id="errorDate"></span>

                <label htmlFor="gatunek">{t('ksiazka.fields.gatunek')}: <span className=""></span></label>
                <input type="number" name="gatunek" id="gatunek" onChange={handleChange} value={ksiazka.gatunek}/>
                <span id="errorGatunek"></span>

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
    function fetchKsiazkaDetails() {
        getKsiazkaByIdApiCall(ksiazkaId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setKsiazka(data)
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
        setKsiazka({
            ...ksiazka,
            [name]: value
        })
    }
    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'tytul') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane.'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków.'
            }
        }
        if (fieldName === 'autor_imie') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane.'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków.'
            }
        }
        if (fieldName === 'autor_nazwisko') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        if (fieldName === 'data_wydania') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            }
        }
        if (fieldName === 'gatunek') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            }
        }

        return errorMessage;
    }



    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if(isNaN(parseInt(ksiazka.waga))){ksiazka.waga =0}
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addKsiazkaApiCall(ksiazka)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateKsiazkaApiCall(ksiazkaId, ksiazka)
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
        Object.entries(ksiazka).forEach(([key, value]) => {
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



} export default KsiazkaForm