import { Link } from 'react-router-dom';
function CzytelnikListTableRow(props) {
    const czytelnik = props.czytelnikData
    return (
        <tr key={czytelnik._id}>
            <td>{czytelnik.imie}</td>
            <td>{czytelnik.nazwisko}</td>
            <td>{czytelnik.data_dolaczenia}</td>
            <td>
                <ul className={"list-actions"}>
                    <li><Link to={`/czytelnik/details/${czytelnik._id}`}
                              className="list-actions-button-details">Szczegóły </Link></li>
                    <li><Link to={`/czytelnik/edit/${czytelnik._id}`} className="list-actions-button-edit">Edytuj </Link>
                    </li>
                    <li><Link to={`/czytelnik/delete/${czytelnik._id}`}
                              className="list-actions-button-delete">Usuń </Link></li>
                </ul>
            </td>
        </tr>
    )
}
export default CzytelnikListTableRow