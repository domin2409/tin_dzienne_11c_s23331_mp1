import { Link } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {getFormattedDate} from "../../helpers/dateHelper";
function WypozyczenieListTableRow(props) {
    const wypozyczenie = props.wypozyczenieData
    const { t } = useTranslation();

    return (
        <tr key={wypozyczenie._id}>
            <td>{wypozyczenie.ksiazka.tytul}</td>
            <td>{wypozyczenie.czytelnik.imie}</td>
            <td>{wypozyczenie.czytelnik.nazwisko}</td>
            <td>{getFormattedDate(wypozyczenie.data_wypozyczenia)}</td>
            <td>{wypozyczenie.zwrocono}</td>
            <td>
                <ul className={"list-actions"}>
                    <li><Link to={`/wypozyczenie/details/${wypozyczenie._id}`}
                              className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/wypozyczenie/edit/${wypozyczenie._id}`}
                              className="list-actions-button-edit">{t('list.actions.edit')} </Link>

                    </li>
                    <li><Link to={`/wypozyczenie/delete/${wypozyczenie._id}`}
                              className="list-actions-button-delete">{t('list.actions.delete')} </Link></li>
                </ul>
            </td>
        </tr>
    )
}
export default WypozyczenieListTableRow