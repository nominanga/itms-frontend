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
import {useSearchParams} from "react-router-dom";
import "./LoginCardForm.css"
import LoginSpinner from "../../ui/LoginSpinner/LoginSpinner.tsx";
import useNavigateWithQuery from "../../../../hooks/useNavigateWithQuery.ts";

interface LoginFormInputs{
    login: string
    password: string
}

const LoginCardForm = () => {
    const {register, formState: {errors}, handleSubmit} = useForm<LoginFormInputs>();
    const updateTokenPayload = useTokenStore((state) => state.updateTokenPayload)
    const [queryParams] = useSearchParams();

    const formId = useId()

    const navigateWithQuery = useNavigateWithQuery();

    const [rememberMe, setRememberMe] = useState(false)
    const [loading, setLoading] = useState(false)

    const { t } = useTranslation()

    const submitLogin = useCallback(async (inputs: LoginFormInputs) => {
        setLoading(true)
        const tokenPayload = await loginUser(
            inputs.login,
            inputs.password,
            false, null,
            null,
            rememberMe
        )
        if (tokenPayload === null) {
            setLoading(false)
            return toast.error(t("toaster_messages.login_error"))
        }
        updateTokenPayload(tokenPayload)
        toast.success(t("toaster_messages.successful_auth"))
        setLoading(false)
        navigateWithQuery("/app")
    }, [navigateWithQuery, rememberMe, t, updateTokenPayload])

    return <div className="login-card">
        <form id={formId} className="login-form" onSubmit={handleSubmit(submitLogin)}>
            <div className="login-form-top">
                <img src={logo} alt={"logo"} className={"itms-logo"} unselectable={"on"}/>
                <AuthInput
                    inputName={t("login_page.login")}
                    type={"text"}
                    errorText={t("login_page.login_required")}
                    isError={errors.login}
                    {...register("login", {required: true})}
                />
                <AuthInput
                    inputName={t("login_page.password")}
                    type={"password"}
                    isError={errors.password}
                    errorText={t("login_page.password_required")}
                    {...register("password", {required: true})}
                />
            </div>
            <div className="login-form-bottom">
                <LanguageSwitcher />
                {queryParams.get("NR") === "1" ||
                    <div className="remember-me-field">
                        <p>{t("login_page.remember_me")}</p>
                        <Switcher
                            checked={rememberMe}
                            setChecked={setRememberMe}
                        />
                    </div>
                }
                <button type={"submit"} form={formId} className="login-button" disabled={loading}>
                    {!loading ? t("login_page.login_button") : <LoginSpinner/>}
                </button>
            </div>
        </form>
    </div>
}

export default LoginCardForm;