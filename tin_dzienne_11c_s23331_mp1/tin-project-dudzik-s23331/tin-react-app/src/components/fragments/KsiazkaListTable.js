import React from 'react';
import KsiazkaListTableRow from "./KsiazkaListTableRow";
import {useTranslation} from "react-i18next";

function KsiazkaListTable(props) {
    const ksiazka = props.ksiazkaList
    const { t } = useTranslation();

    return (
<table className="table-list">
    <thead>
    <tr>
        <th>{t('ksiazka.fields.tytul')}</th>
        <th>{t('ksiazka.fields.autor_imie')}</th>
        <th>{t('ksiazka.fields.autor_nazwisko')}</th>
        <th>{t('ksiazka.fields.data_wydania')}</th>
        <th>{t('ksiazka.fields.waga')}</th>
        <th>{t('ksiazka.fields.gatunek')}</th>
        <th>{t('list.actions.title')}</th>

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
