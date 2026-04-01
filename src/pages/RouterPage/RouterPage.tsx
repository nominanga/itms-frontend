import {accountKey} from "../../types/constants.ts";
import {Navigate, useNavigate, useSearchParams} from "react-router-dom";
import {useCallback, useEffect} from "react";
import {getUserToken} from "../../api/requests/User/getUserToken.ts";
import type {StoredAccountInfo} from "../../types/StoredAccountInfo.ts";
import {useTokenStore} from "../../store/TokenStore.ts";
import {jwtDispatcher} from "../../utils/jwtDispatcher.ts";
import baseAPI from "../../api/baseAPI.ts";
import {useSearchParamsStore} from "../../store/SearchParamsStore.ts";
import type {ItmsSearchParams} from "../../types/ItmsSearchParams.ts";
import {getAccountInfo} from "../../utils/storageAccountInfo.ts";
import {toast} from "sonner";



const RouterPage = () => {
    const updateTokenPayload = useTokenStore((state) => state.updateTokenPayload);
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const updateParams = useSearchParamsStore((state) => state.updateParams)
    const savedSearchParams = useSearchParamsStore((state) => state.params)

    const setParams = useCallback(() => {
        if (savedSearchParams) return
        const newParams: Partial<ItmsSearchParams> = {
            NR: searchParams.get("NR"),
            rfpID: searchParams.get("rfpID"),
            sID: searchParams.get("sID"),
            mrID: searchParams.get("mrID"),
            psGuid: searchParams.get("psGuid")
        }

        updateParams(newParams)

    }, [searchParams, updateParams, savedSearchParams])

    const handleAuth = useCallback(async () => {
        const acct: StoredAccountInfo = getAccountInfo()
        if (!acct) {
            navigate("/login");
            return
        }
        const response = await getUserToken(
            acct.login,
            acct.hash2,
            true,
            acct.auctionId,
            acct.projectSupplierGuid)

        const rawJwt = response.data.Data
        if (!rawJwt)  {
            navigate("/login")
            return
        }
        let tokenPayload
        try {
            tokenPayload = jwtDispatcher(rawJwt)
        } catch {
            navigate("/login")
            return
        }
        updateTokenPayload(tokenPayload)
        baseAPI.defaults.headers.common.Authorization = rawJwt;



    }, [updateTokenPayload, navigate])

    useEffect(() => {
        setParams()
        handleAuth().then(() => {console.log("success!, check the storage")})
    }, [handleAuth, setParams])

    return <>
        {children}
    </>
}

export default RouterPage;