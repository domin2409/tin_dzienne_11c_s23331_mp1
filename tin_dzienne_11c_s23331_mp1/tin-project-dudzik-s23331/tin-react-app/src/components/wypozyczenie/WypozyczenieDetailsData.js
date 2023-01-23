function WypozyczenieDetailsData(props) {
    const wypozyczenie = props.wypozyczenieData
    // const wypozyczenie = props.wypozyczenie

    return (
        <>
            <p>Tytul: {wypozyczenie.ksiazka.tytul}</p>
            <p>Data wypozyczenia: {wypozyczenie.data_wypozyczenia} </p>
            <p>Nazwisko czytelnika: {wypozyczenie.czytelnik.nazwisko} </p>
            <p>Zwrócono?: {wypozyczenie.zwrocono} </p>

        </>
    )
}

export default WypozyczenieDetailsData