import { useState } from 'react'
import { useTranslation } from "react-i18next";
import i18next from 'i18next'

const languages: string[] = ["en", "ru"]

function App() {
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0)

  const { t } = useTranslation()

  function handleLanguageChange() {
    const newLanguageIndex = (currentLanguageIndex + 1) % languages.length
    setCurrentLanguageIndex(newLanguageIndex)
    i18next.changeLanguage(languages[newLanguageIndex]).then(() => {
      window.document.getElementsByTagName("html")[0].lang = i18next.language
    })
  }

  return (
    <>
      <p>{t("greeting")}</p>
      <button onClick={handleLanguageChange}>{t("button_text")}</button>
    </>
  )
}

export default App
