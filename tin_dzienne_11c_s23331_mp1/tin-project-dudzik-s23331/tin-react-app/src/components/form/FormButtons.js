import { Link } from 'react-router-dom';
import FormMode from '../../helpers/FormHelper'
import {useTranslation} from "react-i18next";

function FormButtons(props) {
    const { t } = useTranslation();

    // const submitButtonLabel = props.formMode === FormMode.NEW ?     <p>{t('czytelnik.form.add.btnLabel')}</p> : <p>{t('czytelnik.form.edit.btnLabel')}</p>


    return (
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input className="form-button-submit" type="submit" value={t(`czytelnik.form.${props.formMode === FormMode.NEW ? 'add' : 'edit'}.btnLabel`)} />
            <Link to={props.cancelPath} className="form-button-cancel">{t('form.actions.cancel')}</Link>
        </div>
    )
}

export default FormButtons
