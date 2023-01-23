function CzytelnikDetailsData(props) {
    const czytelnik = props.czytelnikData
    // const wypozyczenie = props.wypozyczenie

    return (
        <>
            <p>Imię: {czytelnik.imie}</p>
            <p>Nazwisko: {czytelnik.nazwisko} </p>
            <p>Data dołączenia: {czytelnik.data_dolaczenia} </p>
            <h2>historia wypozyczeń</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Tytuł</th>
                    <th>Data_wypozyczenia</th>
                    <th>Nazwisko autora</th>
                    <th>Data wydania</th>
                </tr>
                </thead>
                <tbody>
                {czytelnik.wypozyczenia.map(
                    wypozyczenia =>
                        <tr key={wypozyczenia._id}>
                            <td>{wypozyczenia.ksiazka.tytul}</td>
                            <td>{wypozyczenia.data_wypozyczenia}</td>
                            <td>{wypozyczenia.ksiazka.autor_nazwisko }</td>
                            <td>{wypozyczenia.ksiazka.data_wydania }</td>
                        </tr>
                )}
                </tbody>
            </table>
        </>
    )
}

export default CzytelnikDetailsData