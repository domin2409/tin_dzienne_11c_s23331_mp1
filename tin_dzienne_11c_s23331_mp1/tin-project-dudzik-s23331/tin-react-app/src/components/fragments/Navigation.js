import { Link } from 'react-router-dom'


function Navigation() {
    return (
<nav>
    <ul>
        <li><Link to="/" className="<%= navLocation == 'main' ? 'active' : ''%>">Strona główna</Link></li>
        <li><Link to="/czytelnik" className="<%= navLocation == 'czytelnik' ? 'active' : ''%>">Czytelnicy</Link></li>
        <li><Link to="/wypozyczenie" className="<%= navLocation == 'wypozyczenie' ? 'active' : ''%>">Wypożyczenie</Link>
        </li>
        <li><Link to="/ksiazka" className="<%= navLocation == 'ksiazka' ? 'active' : ''%>">Książka</Link></li>
    </ul>
</nav>
    )
}

export default Navigation