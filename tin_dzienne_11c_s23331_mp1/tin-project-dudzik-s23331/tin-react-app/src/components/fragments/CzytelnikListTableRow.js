import { Link } from 'react-router-dom';
import {t} from "i18next";
import {useTranslation} from "react-i18next";
import { isAuthenticated } from '../../helpers/authHelper'
import {getFormattedDate} from "../../helpers/dateHelper";

function CzytelnikListTableRow(props) {
    const czytelnik = props.czytelnikData
    const { t } = useTranslation();

    return (
        <tr key={czytelnik._id}>
            <td>{czytelnik.imie}</td>
            <td>{czytelnik.nazwisko}</td>
            <td>{getFormattedDate(czytelnik.data_dolaczenia)}</td>
            {isAuthenticated() &&
                <td>
                    <ul className={"list-actions"}>
                        <li><Link to={`/czytelnik/details/${czytelnik._id}`}
                                  className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                        <li><Link to={`/czytelnik/edit/${czytelnik._id}`}
                                  className="list-actions-button-edit">{t('list.actions.edit')} </Link>
                        </li>
                        <li><Link to={`/czytelnik/delete/${czytelnik._id}`}
                                  className="list-actions-button-delete">{t('list.actions.delete')} </Link></li>
                    </ul>
                </td>
            }
        </tr>
    )
}
export default CzytelnikListTableRow