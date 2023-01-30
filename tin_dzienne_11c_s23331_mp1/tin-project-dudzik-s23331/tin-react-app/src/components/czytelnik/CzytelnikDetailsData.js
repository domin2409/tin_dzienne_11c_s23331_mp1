import {useTranslation} from "react-i18next";
import {getFormattedDate} from "../../helpers/dateHelper";

function CzytelnikDetailsData(props) {
    const czytelnik = props.czytelnikData
    // const wypozyczenie = props.wypozyczenie
    const { t } = useTranslation();

    return (
        <>
            <p>{t('czytelnik.fields.imie')}: {czytelnik.imie}</p>
            <p>{t('czytelnik.fields.nazwisko')}: {czytelnik.nazwisko} </p>
            <p>{t('czytelnik.fields.data_dolaczenia')}: {getFormattedDate(czytelnik.data_dolaczenia)} </p>
            <h2>{t('wypozyczenie.form.wypozyczenie')}</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('ksiazka.fields.tytul')}</th>
                    <th>{t('wypozyczenie.fields.data_wypozyczenia')}</th>
                    <th>{t('ksiazka.fields.autor_nazwisko')}</th>
                    <th>{t('ksiazka.fields.data_wydania')}</th>
                </tr>
                </thead>
                <tbody>
                {czytelnik.wypozyczenia.map(
                    wypozyczenia =>
                        <tr key={wypozyczenia._id}>
                            <td>{wypozyczenia.ksiazka.tytul}</td>
                            <td>{wypozyczenia.data_wypozyczenia}</td>
                            <td>{wypozyczenia.ksiazka.autor_nazwisko }</td>
                            <td>{getFormattedDate(wypozyczenia.ksiazka.data_wydania) }</td>
                        </tr>
                )}
                </tbody>
            </table>
        </>
    )
}

export default CzytelnikDetailsData