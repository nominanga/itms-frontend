import i18next from 'i18next'
import "./LanguageSwitcher.css"
import {languageKey} from "../../types/constants.ts";

const LanguageSwitcher = () => {

    function changeLanguageTo(languageCode: string) {
        i18next.changeLanguage(languageCode)
        localStorage.setItem(languageKey, languageCode)
    }

    return (
        <div>
            <button onClick={() => changeLanguageTo("ru")}>russian</button>
            <button onClick={() => changeLanguageTo("en")}>english</button>
        </div>
    )
}

export default LanguageSwitcher