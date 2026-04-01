import AuthInput from "../../ui/AuthInput/AuthInput.tsx";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../../../../components/LanguageSwitcher/LanguageSwitcher.tsx";
import Switcher from "../../../../ui/Switcher/Switcher.tsx";
import {logo} from "../../../../assets";
import {useForm} from "react-hook-form"
import {getUserToken} from "../../../../api/requests/User/getUserToken.ts";
import {useCallback, useState} from "react";
import {toast} from "sonner";
import {useTokenStore} from "../../../../store/TokenStore.ts";
import {jwtDispatcher} from "../../../../utils/jwtDispatcher.ts";
import {setAccountInfo} from "../../../../utils/storageAccountInfo.ts";
import {useNavigate} from "react-router-dom";
import {useSearchParamsStore} from "../../../../store/SearchParamsStore.ts";
import baseAPI from "../../../../api/baseAPI.ts";

interface LoginFormInputs{
    login: string
    password: string
}

const LoginCardForm = () => {
    const {register, formState: {errors}, handleSubmit} = useForm<LoginFormInputs>();
    const updateTokenPayload = useTokenStore((state) => state.updateTokenPayload)
    const searchParams = useSearchParamsStore((state) => state.params)

    const navigate = useNavigate()

    const [rememberMe, setRememberMe] = useState(false)

    const { t } = useTranslation()

    const submitLogin = useCallback(async (inputs: LoginFormInputs) => {
        const response = await getUserToken(inputs.login, inputs.password)
        const rawJwt = response.data.Data
        if (!rawJwt) {
            toast.error(t("toaster_messages.login_error"))
            return
        }
        let tokenPayload
        try {
            tokenPayload = jwtDispatcher(rawJwt)
        } catch {
            toast.error(t("toaster_messages.login_error"))
            return
        }
        updateTokenPayload(tokenPayload)
        if (rememberMe) setAccountInfo(
            inputs.login,
            tokenPayload.hash,
            tokenPayload.hash2,
            String(tokenPayload.auctionID),
            null
        )
        baseAPI.defaults.headers.common.Authorization = rawJwt;

        navigate("/")

    }, [navigate, rememberMe, t, updateTokenPayload])

    return <div>
        <form onSubmit={handleSubmit(submitLogin)}>
            <img src={logo} alt={"logo"}/>
            <AuthInput
                inputName={t("login_page.login")}
                type={"text"}
                {...register("login", {required: true})}
            />
            {errors.login && <div>{t("login_page.login_required")}</div> }
            <AuthInput
                inputName={t("login_page.password")}
                type={"password"}
                {...register("password", {required: true})}
            />
            {errors.password && <div>{t("login_page.password_required")}</div> }
            <LanguageSwitcher />
            <p>{t("login_page.remember_me")}</p>
            {!!(searchParams.NR) &&
                <Switcher
                    checked={rememberMe}
                    setChecked={setRememberMe}
                />
            }
            <button type={"submit"}>{t("login_page.login_button")}</button>
        </form>
    </div>
}

export default LoginCardForm;