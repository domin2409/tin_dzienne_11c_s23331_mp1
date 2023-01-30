import { Link } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {getFormattedDate} from "../../helpers/dateHelper";
function KsiazkaListTableRow(props) {
    const ksiazka = props.ksiazkaData
    const { t } = useTranslation();

    return (
        <tr key={ksiazka._id}>
            <td>{ksiazka.tytul}</td>
            <td>{ksiazka.autor_imie}</td>
            <td>{ksiazka.autor_nazwisko}</td>
            <td>{getFormattedDate(ksiazka.data_wydania)}</td>
            <td>{ksiazka.waga}</td>
            <td>{ksiazka.gatunek}</td>
            <td>
                <ul className={"list-actions"}>
                    <li><Link to={`/ksiazka/details/${ksiazka._id}`}
                              className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/ksiazka/edit/${ksiazka._id}`}
                        className="list-actions-button-edit">{t('list.actions.edit')} </Link>

                </li>
                    <li><Link to={`/ksiazka/delete/${ksiazka._id}`}
                              className="list-actions-button-delete">{t('list.actions.delete')} </Link></li>
                </ul>
            </td>
        </tr>
    )
}
export default KsiazkaListTableRow