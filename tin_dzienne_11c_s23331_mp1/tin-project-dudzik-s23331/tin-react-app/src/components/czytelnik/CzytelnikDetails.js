import {Link, useParams} from "react-router-dom";
// import { getCzytelnikApiCall } from '../../apiCalls/czytelnikApiCalls'
import {useEffect, useState} from "react";
import {getCzytelnikByIdApiCall} from "../../apiCalls/czytelnikApiCalls";
// import CzytelnikListTable from "../fragments/CzytelnikListTable";
import CzytelnikDetailsData from "./CzytelnikDetailsData";

function CzytelnikDetails() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [czytelnicy, setCzytelnicy] = useState([])
    const [message, setMessage] = useState(null)
    let { czytelnikId } = useParams()
    czytelnikId = parseInt(czytelnikId)
    // const czytelnikList = getCzytelnikApiCall()
    // const czytelnik = getCzytelnikByIdApiCall(czytelnikId)

    useEffect(() => {
        fetchCzytelnikDetails()
    }, [])

    function fetchCzytelnikDetails() {
        getCzytelnikByIdApiCall(czytelnikId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setCzytelnicy(null)
                        setMessage(data.message)
                    } else {
                        setCzytelnicy(data)
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
            <CzytelnikDetailsData czytelnikData ={czytelnicy} />
            // {/*<Cz visits={doctor.visits} title={visitTableTitle} />*/}
        // </>
    }

    return(
    <main>
        {/*<h2>{title}</h2>*/}
        { content}
        <p className="section-buttons">
            <Link to="/czytelnik" className="button-back">Powrót</Link>
        </p>
    </main>
    )
    }

export default CzytelnikDetails