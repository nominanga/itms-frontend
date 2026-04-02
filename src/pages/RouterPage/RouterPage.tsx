import {useNavigate, useSearchParams} from "react-router-dom";
import {useCallback, useEffect} from "react";
import {loginUser} from "../../api/requests/User/loginUser.ts";
import {useTokenStore} from "../../store/TokenStore.ts";
import {useSearchParamsStore} from "../../store/SearchParamsStore.ts";
import type {ItmsSearchParams} from "../../types/ItmsSearchParams.ts";
import {getAccountInfo, removeAccountInfo} from "../../utils/storageAccountInfo.ts";
import {toast} from "sonner";
import {useTranslation} from "react-i18next";
import {useRedirect} from "../../hooks/useRedirect.ts";



const RouterPage = () => {
    const updateTokenPayload = useTokenStore((state) => state.updateTokenPayload);
    const savedTokenPayload = useTokenStore((state) => state.tokenPayload);
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();
    const redirect = useRedirect();

    const updateParams = useSearchParamsStore((state) => state.updateParams)
    const savedSearchParams = useSearchParamsStore((state) => state.params)

    const { t } = useTranslation();

    const setParams = useCallback(() => {
        if (savedSearchParams) return
        const newParams: ItmsSearchParams = {
            NR: searchParams.get("NR"),
            rfpID: searchParams.get("rfpID"),
            sID: searchParams.get("sID"),
            mrID: searchParams.get("mrID"),
            psGuid: searchParams.get("psGuid")
        }

        updateParams(newParams)

    }, [searchParams, updateParams, savedSearchParams])

    const handleAuth = useCallback(async () => {
        if (savedTokenPayload !== null) {
            return
        }
        const acct = getAccountInfo()
        if (acct === null) {
            return navigate("/login");
        }

        const tokenPayload = await loginUser(
            acct.login,
            acct.hash2,
            true,
            acct.auctionId,
            acct.projectSupplierGuid
        )

        if (tokenPayload === null) {
            removeAccountInfo()
            return navigate("/login");
        }

        updateTokenPayload(tokenPayload)
        toast.success(t("toaster_messages.successful_auth"))
        redirect(savedSearchParams)
    }, [updateTokenPayload, navigate, savedTokenPayload, savedSearchParams, redirect, t])

    useEffect(() => {
        setParams()
        handleAuth()
    }, [handleAuth, setParams])

    return <>
        <div>loading</div>
    </>
}

export default RouterPage;