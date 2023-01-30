import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import {isAuthenticated} from "../../helpers/authHelper";
// import {handleLogout} from "../../App"
function Navigation(props) {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (lng) => {
        console.log(lng)
        i18n.changeLanguage(lng)
    }

    const loginLogoutLink = isAuthenticated() ?
        <button onClick={props.handleLogout}>{t('auth.logout')}</button> :
        <Link to="/login">{t('auth.login')}</Link>
    return (
<nav>
    <ul>
        <li><Link to="/" className="<%= navLocation == 'main' ? 'active' : ''%>">{t('nav.main-page')}</Link></li>
        <li><Link to="/czytelnik" className="<%= navLocation == 'czytelnik' ? 'active' : ''%>">{t('nav.czytelnik')}</Link></li>
        <li><Link to="/wypozyczenie" className="<%= navLocation == 'wypozyczenie' ? 'active' : ''%>">{t('nav.wypozyczenie')}</Link>
        </li>
        <li><Link to="/ksiazka" className="<%= navLocation == 'ksiazka' ? 'active' : ''%>">{t('nav.ksiazka')}</Link></li>
        <li className='lang'>{loginLogoutLink}</li>
        <li className='lang'><button onClick={() => handleLanguageChange('pl')}>PL</button></li>
        <li><button onClick={() => handleLanguageChange('en')}>EN</button></li>

    </ul>
</nav>
    )
}

export default Navigation