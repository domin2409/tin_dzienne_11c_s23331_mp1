import {Link} from "react-router-dom";
// import { getKsiazkaApiCall } from '../../apiCalls/czytelnikApiCalls'
import {useEffect, useState} from "react";
import {getKsiazkaApiCall} from "../../apiCalls/ksiazkaApiCalls";
import KsiazkaListTable from "../fragments/KsiazkaListTable";

function KsiazkaList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [ksiazka, setKsiazka] = useState([])

    // const czytelnikList = getKsiazkaApiCall()


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
    let title = 'Lista książek';
    if (error) {
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Ładowanie danych książek...</p>
    } else if (ksiazka.length === 0) {
        title = <p>Obecnie nie ma żadnych zarejestrowanych książek!</p>
        content = '';
    }else {
        content = <KsiazkaListTable ksiazkaList={ksiazka} />
    }

    return (
        <main>
            <h2>{title}</h2>
            { content}
            <p className="section-buttons">
                <Link to="/ksiazka/add" className="button-add">Dodaj nową książkę</Link>
            </p>
        </main>
    )


}

export default KsiazkaList