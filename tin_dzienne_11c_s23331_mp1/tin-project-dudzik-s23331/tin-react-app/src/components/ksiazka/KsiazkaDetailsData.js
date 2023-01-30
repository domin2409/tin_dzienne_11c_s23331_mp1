import {useTranslation} from "react-i18next";
import {getFormattedDate} from "../../helpers/dateHelper";

function KsiazkaDetailsData(props) {
    const ksiazka = props.ksiazkaData
    // const wypozyczenie = props.wypozyczenie
    const { t } = useTranslation();

    return (
        <>
            <p>{t('ksiazka.fields.tytul')}: {ksiazka.tytul}</p>
            <p>{t('ksiazka.fields.autor_imie')}: {ksiazka.autor_imie} </p>
            <p>{t('ksiazka.fields.autor_nazwisko')}: {ksiazka.autor_nazwisko} </p>
            <p>{t('ksiazka.fields.waga')}: {ksiazka.waga} </p>
            <p>{t('ksiazka.fields.data_wydania')}: {getFormattedDate(ksiazka.data_wydania)} </p>
            <p>{t('ksiazka.fields.gatunek')}: {ksiazka.gatunek} </p>

            <h2>{t('wypozyczenie.form.wypozyczenie')}</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('ksiazka.fields.tytul')}</th>
                    <th>{t('wypozyczenie.fields.data_wypozyczenia')}</th>
                    <th>{t('ksiazka.fields.autor_nazwisko')}</th>
                    <th>{t('ksiazka.fields.data_wydania')}</th>
                    <th>{t('czytelnik.fields.imie')}</th>
                    <th>{t('czytelnik.fields.nazwisko')}</th>
                    <th>{t('wypozyczenie.fields.zwrocono')}</th>
                </tr>
                </thead>
                <tbody>
                {ksiazka.wypozyczenia.map(
                    wypozyczenia =>
                        <tr key={wypozyczenia._id}>
                            <td>{ksiazka.tytul}</td>
                            <td>{getFormattedDate(wypozyczenia.data_wypozyczenia)}</td>
                            <td>{ksiazka.autor_nazwisko }</td>
                            <td>{getFormattedDate(ksiazka.data_wydania )}</td>
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