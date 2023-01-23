import {Link} from "react-router-dom";
// import { getCzytelnikApiCall } from '../../apiCalls/czytelnikApiCalls'
import {useEffect, useState} from "react";
import {getCzytelnikApiCall} from "../../apiCalls/czytelnikApiCalls";
import CzytelnikListTable from "../fragments/CzytelnikListTable";

function CzytelnikList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [czytelnicy, setCzytelnicy] = useState([])

    // const czytelnikList = getCzytelnikApiCall()


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
    let title = 'Lista czytelników';
    if (error) {
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Ładowanie danych czytelników...</p>
    } else if (czytelnicy.length === 0) {
        title = <p>Obecnie nie ma żadnych zarejestrowanych czytelników!</p>
        content = '';
    }else {
        content = <CzytelnikListTable czytelnikList={czytelnicy} />
    }

    return (
        <main>
            <h2>{title}</h2>
            { content}
            <p className="section-buttons">
                <Link to="/czytelnik/add" className="button-add">Dodaj nowego czytelnika</Link>
            </p>
        </main>
    )


}

export default CzytelnikList