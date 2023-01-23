function KsiazkaDetailsData(props) {
    const ksiazka = props.ksiazkaData
    // const wypozyczenie = props.wypozyczenie

    return (
        <>
            <p>Tytuł: {ksiazka.tytul}</p>
            <p>Imie autora: {ksiazka.autor_imie} </p>
            <p>Nazwisko autora: {ksiazka.autor_nazwisko} </p>
            <p>Waga: {ksiazka.waga} </p>
            <p>Data wydania: {ksiazka.data_wydania} </p>
            <h2>historia wypozyczeń</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Tytuł</th>
                    <th>Data_wypozyczenia</th>
                    <th>Nazwisko autora</th>
                    <th>Data wydania</th>
                    <th>Imie czytelnika</th>
                    <th>Nazwisko czytelnika</th>
                    <th>Zwrócono?</th>
                </tr>
                </thead>
                <tbody>
                {ksiazka.wypozyczenia.map(
                    wypozyczenia =>
                        <tr key={wypozyczenia._id}>
                            <td>{ksiazka.tytul}</td>
                            <td>{wypozyczenia.data_wypozyczenia}</td>
                            <td>{ksiazka.autor_nazwisko }</td>
                            <td>{ksiazka.data_wydania }</td>
                            <td>{wypozyczenia.czytelnik.imie }</td>
                            <td>{wypozyczenia.czytelnik.nazwisko }</td>
                            <td>{wypozyczenia.zwrocono }</td>
                        </tr>
                )}
                </tbody>
            </table>
        </>
    )
}

export default KsiazkaDetailsData