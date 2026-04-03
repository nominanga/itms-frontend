import AuthInput from "../../ui/AuthInput/AuthInput.tsx";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../../../../components/LanguageSwitcher/LanguageSwitcher.tsx";
import Switcher from "../../../../ui/Switcher/Switcher.tsx";
import {logo} from "../../../../assets";
import {useForm} from "react-hook-form"
import {loginUser} from "../../../../api/requests/User/loginUser.ts";
import {useCallback, useId, useState} from "react";
import {toast} from "sonner";
import {useTokenStore} from "../../../../store/TokenStore.ts";
import {useRedirect} from "../../../../hooks/useRedirect.ts";
import {useSearchParams} from "react-router-dom";

interface LoginFormInputs{
    login: string
    password: string
}

const LoginCardForm = () => {
    const {register, formState: {errors}, handleSubmit} = useForm<LoginFormInputs>();
    const updateTokenPayload = useTokenStore((state) => state.updateTokenPayload)
    const [queryParams] = useSearchParams();

    const formId = useId()

    const redirect = useRedirect()

    const [rememberMe, setRememberMe] = useState(false)

    const { t } = useTranslation()

    const submitLogin = useCallback(async (inputs: LoginFormInputs) => {
        const tokenPayload = await loginUser(
            inputs.login,
            inputs.password,
            false, null,
            null,
            rememberMe
        )
        if (tokenPayload === null) return toast.error(t("toaster_messages.login_error"))
        updateTokenPayload(tokenPayload)
        toast.success(t("toaster_messages.successful_auth"))
        redirect()

    }, [redirect, rememberMe, t, updateTokenPayload])

    return <div>
        <form id={formId} onSubmit={handleSubmit(submitLogin)}>
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
            {queryParams.get("NR") === "1" ||
                <>
                    <p>{t("login_page.remember_me")}</p>
                    <Switcher
                        checked={rememberMe}
                        setChecked={setRememberMe}
                    />
                </>
            }
            <button type={"submit"} form={formId}>{t("login_page.login_button")}</button>
        </form>
    </div>
}

export default LoginCardForm;