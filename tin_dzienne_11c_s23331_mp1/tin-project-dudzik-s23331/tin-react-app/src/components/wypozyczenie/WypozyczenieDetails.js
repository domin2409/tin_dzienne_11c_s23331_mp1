import {Link, useParams} from "react-router-dom";
// import { getWypozyczenieApiCall } from '../../apiCalls/wypozyczenieApiCalls'
import {useEffect, useState} from "react";
import {getWypozyczenieByIdApiCall} from "../../apiCalls/wypozyczenieApiCalls";
// import WypozyczenieListTable from "../fragments/WypozyczenieListTable";
import WypozyczenieDetailsData from "./WypozyczenieDetailsData";

function WypozyczenieDetails() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [wypozyczenie, setWypozyczenie] = useState([])
    const [message, setMessage] = useState(null)
    let { wypozyczenieId } = useParams()
    wypozyczenieId = parseInt(wypozyczenieId)
    // const wypozyczenieList = getWypozyczenieApiCall()
    // const wypozyczenie = getWypozyczenieByIdApiCall(wypozyczenieId)

    useEffect(() => {
        fetchWypozyczenieDetails()
    }, [])

    function fetchWypozyczenieDetails() {
        getWypozyczenieByIdApiCall(wypozyczenieId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setWypozyczenie(null)
                        setMessage(data.message)
                    } else {
                        setWypozyczenie(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }


    let content;

    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Loading employee data...</p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content =
            // <>
            <WypozyczenieDetailsData wypozyczenieData ={wypozyczenie} />
            // {/*<Cz visits={doctor.visits} title={visitTableTitle} />*/}
        // </>
    }

    return(
    <main>
        {/*<h2>{title}</h2>*/}
        { content}
        <p className="section-buttons">
            <Link to="/wypozyczenie" className="button-back">Powrót</Link>
        </p>
    </main>
    )
    }

export default WypozyczenieDetails