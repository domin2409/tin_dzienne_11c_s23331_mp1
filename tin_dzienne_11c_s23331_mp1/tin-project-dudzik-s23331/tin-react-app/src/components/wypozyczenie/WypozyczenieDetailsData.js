import {t} from "i18next";
import {useTranslation} from "react-i18next";
import { getFormattedDate } from '../../helpers/dateHelper'

function WypozyczenieDetailsData(props) {
    const wypozyczenie = props.wypozyczenieData
    // const wypozyczenie = props.wypozyczenie
    const { t } = useTranslation();

    return (
        <>

            <p>{t('czytelnik.list.title')}: {wypozyczenie.ksiazka.tytul}</p>
            <p>{t('wypozyczenie.fields.data_wypozyczenia')}: {getFormattedDate(wypozyczenie.data_wypozyczenia)} </p>
            <p>{t('czytelnik.fields.nazwisko')}: {wypozyczenie.czytelnik.nazwisko} </p>
            <p>{t('wypozyczenie.fields.zwrocono')}: {wypozyczenie.zwrocono} </p>

        </>
    )
}

export default WypozyczenieDetailsData