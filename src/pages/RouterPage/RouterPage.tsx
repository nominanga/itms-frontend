import {useCallback, useEffect} from "react";
import {loginUser} from "../../api/requests/User/loginUser.ts";
import {useTokenStore} from "../../store/TokenStore.ts";
import {getAccountInfo, removeAccountInfo} from "../../utils/storageAccountInfo.ts";
import {toast} from "sonner";
import {useTranslation} from "react-i18next";
import {useRedirect} from "../../hooks/useRedirect.ts";
import useNavigateWithQuery from "../../hooks/useNavigateWithQuery.ts";
import CenteredSpinner from "../../ui/CenteredSpinner/CenteredSpinner.tsx";

const RouterPage = () => {
    const updateTokenPayload = useTokenStore((state) => state.updateTokenPayload);
    const savedTokenPayload = useTokenStore((state) => state.tokenPayload);

    const navigateWithQuery = useNavigateWithQuery();
    const redirect = useRedirect();

    const { t } = useTranslation();

    const handleAuth = useCallback(async () => {
        if (savedTokenPayload !== null) {
            return redirect()
        }
        const acct = getAccountInfo()
        if (acct === null) {
            return navigateWithQuery("/login")
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
            return navigateWithQuery("/login");
        }

        updateTokenPayload(tokenPayload)
        toast.success(t("toaster_messages.successful_auth"))
        redirect()
    }, [updateTokenPayload, navigateWithQuery, savedTokenPayload, redirect, t])

    useEffect(() => {
        handleAuth()
    }, [])

    return <>
        <CenteredSpinner/>
    </>
}

export default RouterPage;