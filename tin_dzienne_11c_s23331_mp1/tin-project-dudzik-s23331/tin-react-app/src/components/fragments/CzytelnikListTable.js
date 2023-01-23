import React from 'react';
import CzytelnikListTableRow from './CzytelnikListTableRow'

function CzytelnikListTable(props) {
    const czytelnicy = props.czytelnikList
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
    {czytelnicy.map(czytelnik =>
        <CzytelnikListTableRow czytelnikData={czytelnik} key ={czytelnik._id}/>
    )}

    </tbody>
</table>
    )
}

export default CzytelnikListTable
