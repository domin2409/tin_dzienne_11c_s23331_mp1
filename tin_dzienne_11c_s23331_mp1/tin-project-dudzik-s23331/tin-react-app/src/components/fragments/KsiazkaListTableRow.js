import { Link } from 'react-router-dom';
function KsiazkaListTableRow(props) {
    const ksiazka = props.ksiazkaData
    return (
        <tr key={ksiazka._id}>
            <td>{ksiazka.imie}</td>
            <td>{ksiazka.nazwisko}</td>
            <td>{ksiazka.data_dolaczenia}</td>
            <td>
                <ul className={"list-actions"}>
                    <li><Link to={`/ksiazka/details/${ksiazka._id}`}
                              className="list-actions-button-details">Szczegóły </Link></li>
                    <li><Link to={`/ksiazka/edit/${ksiazka._id}`} className="list-actions-button-edit">Edytuj </Link>
                    </li>
                    <li><Link to={`/ksiazka/delete/${ksiazka._id}`}
                              className="list-actions-button-delete">Usuń </Link></li>
                </ul>
            </td>
        </tr>
    )
}
export default KsiazkaListTableRow