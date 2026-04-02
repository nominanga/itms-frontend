import i18next from 'i18next'
import "./LanguageSwitcher.css"

const LanguageSwitcher = () => {

    function changeLanguageTo(languageCode: string) {
        i18next.changeLanguage(languageCode)
    }

    return (
        <div>
            <button type={"button"} onClick={() => changeLanguageTo("ru")}>russian</button>
            <button type={"button"} onClick={() => changeLanguageTo("en")}>english</button>
        </div>
    )
}

export default LanguageSwitcher