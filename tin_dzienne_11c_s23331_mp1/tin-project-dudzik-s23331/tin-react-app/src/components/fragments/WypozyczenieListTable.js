import React from 'react';
import WypozyczenieListTableRow from './WypozyczenieListTableRow'

function WypozyczenieListTable(props) {
    const wypozyczenie = props.wypozyczenieList
    return (
<table className="table-list">
    <thead>
    <tr>
        <th>Imie</th>
        <th>Nazwisko</th>
        <th>Data dołączenia</th>
        <th>Akcje</th>
    </tr>
    </thead>
    <tbody>
    {wypozyczenie.map(wypozyczenie =>
        <WypozyczenieListTableRow wypozyczenieData={wypozyczenie} key ={wypozyczenie._id}/>
    )}

    </tbody>
</table>
    )
}

export default WypozyczenieListTable
