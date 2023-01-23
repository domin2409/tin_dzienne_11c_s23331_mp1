import React from 'react';
import CzytelnikListTableRow from './CzytelnikListTableRow'
import KsiazkaListTableRow from "./KsiazkaListTableRow";

function KsiazkaListTable(props) {
    const ksiazka = props.ksiazkaList
    return (
<table className="table-list">
    <thead>
    <tr>
        <th>Tytul</th>
        <th>Imie autora</th>
        <th>Nazwisko autora</th>
        <th>Data wydania</th>
        <th>Waga</th>
        <th>Akcje</th>
    </tr>
    </thead>
    <tbody>
    {ksiazka.map(ksiazka =>
        <KsiazkaListTableRow ksiazkaData={ksiazka} key ={ksiazka._id}/>
    )}

    </tbody>
</table>
    )
}

export default KsiazkaListTable
