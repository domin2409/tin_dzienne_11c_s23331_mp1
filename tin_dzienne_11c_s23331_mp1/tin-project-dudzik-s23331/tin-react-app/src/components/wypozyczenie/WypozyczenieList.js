import {Link} from "react-router-dom";
// import { WetwypozyczenieApiCall } from '../../apiCalls/czytelnikApiCalls'
import {useEffect, useState} from "react";
import {getWypozyczenieApiCall} from "../../apiCalls/wypozyczenieApiCalls";
import WypozyczenieListTable from "../fragments/WypozyczenieListTable";

function WypozyczenieList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [wypozyczenie, setWypozyczenie] = useState([])

    // const czytelnikList = WetwypozyczenieApiCall()


    useEffect(() => {
        fetchWypozyczenieList()
    }, [])


    function fetchWypozyczenieList(){
        getWypozyczenieApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setWypozyczenie(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }







    let content;
    let title = 'Lista wypożyczeń';
    if (error) {
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Ładowanie danych wypożyczeń...</p>
    } else if (wypozyczenie.length === 0) {
        title = <p>Obecnie nie ma żadnych zarejestrowanych wypożyczeń!</p>
        content = '';
    }else {
        content = <WypozyczenieListTable wypozyczenieList={wypozyczenie} />
    }

    return (
        <main>
            <h2>{title}</h2>
            { content}
            <p className="section-buttons">
                <Link to="/wypozyczenie/add" className="button-add">Dodaj nowe wypożyczenie</Link>
            </p>
        </main>
    )


}

export default WypozyczenieList