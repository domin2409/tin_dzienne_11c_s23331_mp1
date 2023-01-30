import {getCzytelnikApiCall} from "../../apiCalls/czytelnikApiCalls";
import { getKsiazkaApiCall, } from "../../apiCalls/ksiazkaApiCalls";
import { useNavigate, useParams} from 'react-router-dom';
import FormMode from '../../helpers/FormHelper'
import {useEffect, useState} from "react";
import FormButtons from "../form/FormButtons";
import {
    addWypozyczenieApiCall,
    getWypozyczenieByIdApiCall,
    updateWypozyczenieApiCall
} from "../../apiCalls/wypozyczenieApiCalls";
import {checkRequired} from "../../helpers/validationCommon";
import {t} from "i18next";
import {useTranslation} from "react-i18next";

function WypozyczenieForm(){
    const { t } = useTranslation();

    const [wypozyczenie, setWypozyczenie] = useState({
        'id_czytelnik': '',
        'id_ksiazka': '',
        'data_wypozyczenia': '',
        'zwrocono': ''
    })
    const [errors, setErrors] = useState({
        'id_czytelnik': '',
        'id_ksiazka': '',
        'data_wypozyczenia': '',
        'zwrocono': ''
    })

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)


    const { wypozyczenieId } = useParams()
    const currentFormMode = wypozyczenieId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate();
    const pageTitle = t(`wypozyczenie.form.${currentFormMode=== FormMode.NEW ? 'add' : 'edit'}.pageTitle`);
    const submitButtonLabel = currentFormMode === FormMode.NEW ? 'Add' : 'Edit';
    const cancelPath = "/wypozyczenie"

    const errorsSummary = hasErrors() ? 'Form contains errors' : '';
    const fetchError = error ? `Error: ${error.message}` : '';
    const globalErrorMessage = errorsSummary || fetchError || message;



    const [allCzytelnik, setAllCzytelnik] = useState([])
    const [allKsiazka, setAllKsiazka] = useState([])

    useEffect(() => {
        if (currentFormMode === FormMode.EDIT) {
            fetchWypozyczenieDetails()
        }
        getKsiazkaApiCall()
            .then(res => res.json())
            .then(data => setAllKsiazka(data));

        getCzytelnikApiCall()
            .then(res => res.json())
            .then(data => setAllCzytelnik(data));
    }, [])
    useEffect(() => {
        if (redirect) {
            navigate('/wypozyczenie')
        }
    }, [redirect])



    let content;
    if (!isLoaded && currentFormMode === FormMode.EDIT) {
        content = "Pobieranie danych wypozyczeń...";

    } else {
        content = (
            <form className="form" onSubmit={handleSubmit}>
                <h2>{pageTitle}{console.log(wypozyczenie)}</h2>
                <label htmlFor="id_ksiazka">{t('ksiazka.fields.tytul')}: <span className="symbol-required">*</span></label>
                <select id="id_ksiazka" name="id_ksiazka"  required onChange={handleChange} value={wypozyczenie.id_ksiazka}>
                                     <option value="">Wybierz ksiażkę</option>
                                     {allKsiazka.map( ksiazka =>
                                         (<option key={ksiazka._id} value={ksiazka._id} label={ksiazka.tytul}></option>)
                                     )}
                                 </select>
                <span id="errortytul"></span>




                <label htmlFor="id_czytelnik">{t('czytelnik.list.title')}: <span className="symbol-required">*</span></label>
                             <select id="id_czytelnik" name="id_czytelnik" required onChange={handleChange} value={wypozyczenie.id_czytelnik}>
                                 <option value="">Wybierz czytelnika</option>
                                 {allCzytelnik.map( czytelnik =>
                                     (<option key={czytelnik._id} value={czytelnik._id} label={czytelnik.imie + " " + czytelnik.nazwisko}></option>)
                                 )}
                             </select>
                <span id="errorIdCzytelnik"></span>

                {/*<label htmlFor="autor_nazwisko">Nazwisko: <span className="symbol-required">*</span></label>*/}
                {/*<select name="autor_nazwisko" id="autor_nazwisko" required onChange={handleChange} value={wypozyczenie.id_ksiazka}>*/}
                {/*<option value="">Wybierz autora</option>*/}
                {/*{allKsiazka.map( ksiazka =>*/}
                {/*    (<option key={ksiazka._id} value={ksiazka._id} label={ksiazka.autor_imie + " " + ksiazka.autor_nazwisko}></option>)*/}
                {/*)}*/}
                {/*</select>*/}

                {/*<span id="errorAutorNazwisko"></span>*/}



                <label htmlFor="data_wypozyczenia">{t('wypozyczenie.fields.data_wypozyczenia')}: <span className="symbol-required">*</span></label>
                <input type="date" name="data_wypozyczenia" id="data_wypozyczenia"  required onChange={handleChange} value={wypozyczenie.data_wypozyczenia}/>
                <span id="errorDate"></span>

                <label htmlFor="zwrocono">{t('wypozyczenie.fields.zwrocono')}<span className="symbol-required">*</span></label>
                <input type="number" name="zwrocono" id="zwrocono"  required onChange={handleChange} value={wypozyczenie.zwrocono}/>
                <span id="errorZwrocono"></span>
                <FormButtons
                    error={globalErrorMessage}
                    submitButtonLabel={submitButtonLabel}
                    cancelPath={cancelPath} />
            </form>
        )
    }
    return (
        <main>
            {content}
        </main>
    )
    function fetchWypozyczenieDetails() {
        getWypozyczenieByIdApiCall(wypozyczenieId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message);
                    } else {
                        setWypozyczenie(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setError(error)
                    setIsLoaded(true)
                })
    }

    function handleChange(event) {
        const {name, value} = event.target;
        const errorMessage = validateField(name, value);

        setErrors({
            ...errors,
            [name]: errorMessage
        })

        setWypozyczenie({
            ...wypozyczenie,
            [name]: value
        })
    }



    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'id_czytelnik') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane.'
            }
        }
        if (fieldName === 'id_ksiazka') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane.'
            }
        }
        if (fieldName === 'data_wypozyczenia') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            }
        }
        if (fieldName === 'zwrocono') {
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
                promise = addWypozyczenieApiCall(wypozyczenie)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateWypozyczenieApiCall(wypozyczenieId, wypozyczenie)
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
        Object.entries(wypozyczenie).forEach(([key, value]) => {
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



}
export default WypozyczenieForm