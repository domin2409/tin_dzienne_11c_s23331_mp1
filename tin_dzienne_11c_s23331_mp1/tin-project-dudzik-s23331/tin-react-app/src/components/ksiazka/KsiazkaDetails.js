import {Link, useParams} from "react-router-dom";
// import { getCzytelnikApiCall } from '../../apiCalls/ksiazkaApiCalls'
import {useEffect, useState} from "react";
import {getKsiazkaByIdApiCall} from "../../apiCalls/ksiazkaApiCalls";
// import CzytelnikListTable from "../fragments/CzytelnikListTable";
import KsiazkaDetailsData from "./KsiazkaDetailsData";

function KsiazkaDetails() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [ksiazka, setKsiazka] = useState([])
    const [message, setMessage] = useState(null)
    let { ksiazkaId } = useParams()
    ksiazkaId = parseInt(ksiazkaId)
    // const ksiazkaList = getCzytelnikApiCall()
    // const ksiazka = getCzytelnikByIdApiCall(ksiazkaId)

    useEffect(() => {
        fetchKsiazkaDetails()
    }, [])

    function fetchKsiazkaDetails() {
        getKsiazkaByIdApiCall(ksiazkaId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setKsiazka(null)
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
            <KsiazkaDetailsData ksiazkaData ={ksiazka} />
            // {/*<Cz visits={doctor.visits} title={visitTableTitle} />*/}
        // </>
    }

    return(
    <main>
        {/*<h2>{title}</h2>*/}
        { content}
        <p className="section-buttons">
            <Link to="/ksiazka" className="button-back">Powrót</Link>
        </p>
    </main>
    )
    }

export default KsiazkaDetails