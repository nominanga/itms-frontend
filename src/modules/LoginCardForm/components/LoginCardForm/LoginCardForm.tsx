import {useState} from "react";
import AuthInput from "../../ui/AuthInput/AuthInput.tsx";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../../../../components/LanguageSwitcher/LanguageSwitcher.tsx";
import Switcher from "../../../../ui/Switcher/Switcher.tsx";
import {logo} from "../../../../assets";

export const LoginCardForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const { t } = useTranslation()

    return <div>
        <img src={logo} alt={"logo"}/>
        <AuthInput
            inputName={t("login_page.login")}
            type={"text"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
            inputName={t("login_page.password")}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <LanguageSwitcher/>
        <p>{t("login_page.remember_me")}</p>
        <Switcher/>
        <button>{t("login_page.login_button")}</button>
    </div>
}
