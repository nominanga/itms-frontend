import i18next from 'i18next'
import "./LanguageSwitcher.css"
import {russianFlag, englishFlag} from "../../assets"

const LanguageSwitcher = () => {

    function changeLanguageTo(languageCode: string) {
        i18next.changeLanguage(languageCode)
    }

    return (
        <div className="language-switcher-container">
            <button type={"button"} onClick={() => changeLanguageTo("ru")}>
                <img src={russianFlag} alt="russian" />
            </button>
            <button type={"button"} onClick={() => changeLanguageTo("en")}>
                <img src={englishFlag} alt="english"/>
            </button>
        </div>
    )
}

export default LanguageSwitcher