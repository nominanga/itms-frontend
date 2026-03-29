import {useState} from "react";
import AuthInput from "../../ui/AuthInput/AuthInput.tsx";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../../../../components/LanguageSwitcher/LanguageSwitcher.tsx";
import Switcher from "../../../../ui/Switcher/Switcher.tsx";
import {logo} from "../../../../assets";
import {useQuery} from "@tanstack/react-query";
import {getUserToken} from "../../api/getUserToken.ts";

const LoginCardForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const {data, error, isFetching, refetch} = useQuery({
        queryKey: ["login"],
        queryFn: async () => {
            const response = await getUserToken(login, password)

        },
        enabled: false,
    })

    const submitLogin = () => {

    }

    const { t } = useTranslation()

    return <div>
        <form>
            <img src={logo} alt={"logo"}/>
            <AuthInput
                inputName={t("login_page.login")}
                type={"text"}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
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
            <button type={"submit"} onSubmit={}>{t("login_page.login_button")}</button>
        </form>
    </div>
}

export default LoginCardForm;