import React from 'react';
import CzytelnikListTableRow from './CzytelnikListTableRow'
import {t} from "i18next";
import {useTranslation} from "react-i18next";

function CzytelnikListTable(props) {
    const czytelnicy = props.czytelnikList
    const { t } = useTranslation();

    return (
<table className="table-list">
    <thead>
    <tr>
        <th>{t('czytelnik.fields.imie')}</th>
        <th>{t('czytelnik.fields.nazwisko')}</th>
        <th>{t('czytelnik.fields.data_dolaczenia')}</th>
        <th>{t('list.actions.title')}</th>
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
