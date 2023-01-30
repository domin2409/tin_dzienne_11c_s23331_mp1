import {Link} from "react-router-dom";
// import { getCzytelnikApiCall } from '../../apiCalls/czytelnikApiCalls'
import {useEffect, useState} from "react";
import {getCzytelnikApiCall} from "../../apiCalls/czytelnikApiCalls";
import CzytelnikListTable from "../fragments/CzytelnikListTable";
import {t} from "i18next";
import {useTranslation} from "react-i18next";

function CzytelnikList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [czytelnicy, setCzytelnicy] = useState([])

    // const czytelnikList = getCzytelnikApiCall()

    const { t } = useTranslation();


    useEffect(() => {
        fetchCzytelnikList()
    }, [])


    function fetchCzytelnikList(){
        getCzytelnikApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setCzytelnicy(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }







    let content;
    let title = <p>{t('czytelnik.list.pageTitle')}</p>
    if (error) {
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('czytelnik.list.loadData')}</p>
    } else if (czytelnicy.length === 0) {
        title = <p>{t('czytelnik.list.noData')}</p>
        content = '';
    }else {
        content = <CzytelnikListTable czytelnikList={czytelnicy} />
    }

    return (
        <main>
            <h2>{title}</h2>
            { content}
            <p className="section-buttons">
                <Link to="/czytelnik/add" className="button-add">{t('czytelnik.list.addNew')}</Link>
            </p>
        </main>
    )


}

export default CzytelnikList