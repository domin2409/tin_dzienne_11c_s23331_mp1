import React from 'react';
import WypozyczenieListTableRow from './WypozyczenieListTableRow'
import {useTranslation} from "react-i18next";

function WypozyczenieListTable(props) {
    const wypozyczenie = props.wypozyczenieList
    const { t } = useTranslation();

    return (
<table className="table-list">
    <thead>
    <tr>
        <th>{t('ksiazka.fields.tytul')}</th>
        <th>{t('czytelnik.fields.imie')}</th>
        <th>{t('czytelnik.fields.nazwisko')}</th>
        <th>{t('czytelnik.fields.data_dolaczenia')}</th>
        <th>{t('wypozyczenie.fields.zwrocono')}?</th>
        <th>{t('list.actions.title')}</th>
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
