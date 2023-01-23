import {getCzytelnikApiCall} from "../../apiCalls/czytelnikApiCalls";
import {getKsiazkaApiCall} from "../../apiCalls/ksiazkaApiCalls";
import { Link } from 'react-router-dom';
import FormMode from '../../helpers/FormHelper'

function WypozyczenieForm(){
    const allCzytelnik = getCzytelnikApiCall()
    const allKsiazka = getKsiazkaApiCall()

    return (
        <main>
            <h2>Nowe wypożyczenie</h2>
            <form className="form">
                <label htmlFor="czytelnik">Czytelnik: <abbr title="required" aria-label="required">*</abbr></label>
                <select id="czytelnik" name="czytelnikId" required>
                    <option value="">Wybierz czytelnika</option>
                    {allCzytelnik.map( czytelnik =>
                        (<option key={czytelnik._id} value={czytelnik._id} label={czytelnik.imie + " " + czytelnik.nazwisko}></option>)
                    )}
                </select>
                <span id="errorCzytelnik" className="errors-text"></span>
                <label htmlFor="ksiazka">Ksiażka: <abbr title="required" aria-label="required">*</abbr></label>
                <select id="ksiazka" name="ksiazkaId" required>
                    <option value="">Wybierz ksiażkę</option>
                    {allKsiazka.map( ksiazka =>
                        (<option key={ksiazka._id} value={ksiazka._id} label={ksiazka.tytul}></option>)
                    )}
                </select>
                <span id="errorKsiazka" className="errors-text"></span>
                <label htmlFor="data_wypozyczenia">Data wypozyczenia</label>
                <input type="date" name="data_wypozyczenia" value="" id="data_wypozyczenia"/>
                <div className="form-buttons">
                    <p id="errorsSummary" className="errors-text"></p>
                    <input className="form-button-submit" type="submit" value="Dodaj" />
                    <Link to="/wypozyczenie" className="form-button-cancel">Anuluj</Link>
                </div>



            </form>
        </main>

    )


}
export default WypozyczenieForm