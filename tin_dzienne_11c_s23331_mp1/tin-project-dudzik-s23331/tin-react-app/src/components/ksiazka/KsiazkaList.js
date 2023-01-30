import {Link} from "react-router-dom";
// import { getKsiazkaApiCall } from '../../apiCalls/czytelnikApiCalls'
import {useEffect, useState} from "react";
import {getKsiazkaApiCall} from "../../apiCalls/ksiazkaApiCalls";
import KsiazkaListTable from "../fragments/KsiazkaListTable";
import {useTranslation} from "react-i18next";

function KsiazkaList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [ksiazka, setKsiazka] = useState([])

    // const czytelnikList = getKsiazkaApiCall()

    const { t } = useTranslation();

    useEffect(() => {
        fetchKsiazkaList()
    }, [])


    function fetchKsiazkaList(){
        getKsiazkaApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setKsiazka(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }







    let content;
    let title = <p>{t('ksiazka.list.pageTitle')}</p>;
    if (error) {
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('ksiazka.list.loadData')}</p>
    } else if (ksiazka.length === 0) {
        title = <p>{t('ksiazka.list.noData')}</p>
        content = '';
    }else {
        content = <KsiazkaListTable ksiazkaList={ksiazka} />
    }

    return (
        <main>
            <h2>{title}</h2>
            { content}
            <p className="section-buttons">
                <Link to="/ksiazka/add" className="button-add">{t('ksiazka.list.addNew')}</Link>
            </p>
        </main>
    )


}

export default KsiazkaList