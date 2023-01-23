import { Link } from 'react-router-dom';
function WypozyczenieListTableRow(props) {
    const wypozyczenie = props.wypozyczenieData
    return (
        <tr key={wypozyczenie._id}>
            <td>{wypozyczenie.data_wypozyczenia}</td>
            <td>{wypozyczenie.zwrocono}</td>
            <td>
                <ul className={"list-actions"}>
                    <li><Link to={`/wypozyczenie/details/${wypozyczenie._id}`}
                              className="list-actions-button-details">Szczegóły </Link></li>
                    <li><Link to={`/wypozyczenie/edit/${wypozyczenie._id}`} className="list-actions-button-edit">Edytuj </Link>
                    </li>
                    <li><Link to={`/wypozyczenie/delete/${wypozyczenie._id}`}
                              className="list-actions-button-delete">Usuń </Link></li>
                </ul>
            </td>
        </tr>
    )
}
export default WypozyczenieListTableRow