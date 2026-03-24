import { useState } from 'react'
import { useTranslation } from "react-i18next";
import i18next from 'i18next'
import baseAPI from "./api/baseAPI.ts";
import useAuthStore from "./store/authStore.ts";

const languages: string[] = ["en", "ru"]

function App() {
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0)

  const { t } = useTranslation()

  const authToken = useAuthStore((state) => state.authToken)
  const setToken = useAuthStore((state) => state.setToken)

  function handleLanguageChange() {
    const newLanguageIndex = (currentLanguageIndex + 1) % languages.length
    setCurrentLanguageIndex(newLanguageIndex)
    i18next.changeLanguage(languages[newLanguageIndex]).then(() => {
      window.document.getElementsByTagName("html")[0].lang = i18next.language
    })
  }

  const testAPI = async () => {
    let token = authToken;
    if (token === null) {
      token = await authTokenRequest();
      if (token === null) return;
      setToken(token)
    }
    const testResponse = await baseAPI.get("TacticalResolution?Display={\"start\":0,\"count\":30,\"Sortings\":null}", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    console.log(testResponse.data)
  }

  async function authTokenRequest(): Promise<string | null> {
    const authResponse = await baseAPI.get("/User/Token/PP_devt?Password=pass&S=false")
    if (authResponse.status !== 200) {
      console.log(authResponse.data)
      return null;
    }
    return authResponse.data["Data"];
  }



  return (
    <>
      <p>{t("greeting")}</p>
      <button onClick={handleLanguageChange}>{t("button_text")}</button>
      <button onClick={async () => await testAPI()}>{t("fetch_button")}</button>
    </>
  )
}

export default App


