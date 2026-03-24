import i18next from 'i18next'
import "LanguageSwitcher.css"

const LanguageSwitcher = () => {

    function changeLanguageTo(languageCode: string) {
        i18next.changeLanguage(languageCode).then(() => {
            window.document.getElementsByTagName("html")[0].lang = i18next.language
        })
    }

    return (
        <div>
            <button onClick={() => changeLanguageTo("ru")}>russian</button>
            <button onClick={() => changeLanguageTo("en")}>english</button>
        </div>
    )
}

export default LanguageSwitcher