import baseAPI from "../../baseAPI.ts";
import type {ApiResponse} from "../../../types/apiTypes.ts";
import {jwtDispatcher} from "../../../utils/jwtDispatcher.ts";
import {setAccountInfo} from "../../../utils/storageAccountInfo.ts";

export async function loginUser(
    login: string,
    password: string,
    s?: boolean,
    auctionId?: string | null,
    psguID?: string | null,
    remember?: boolean,
) {
    let response
    try {
        response = await baseAPI.get<ApiResponse<string>>(`/User/Token/${encodeURIComponent(login)}`, {
            params: {
                "Password": password,
                "S": s ?? false,
                "AuctionID": auctionId ?? "",
                "ProjectSupplierGUID": psguID ?? ""
            }
        })
    } catch {
        return null
    }

    const rawJwt = response.data.Data
    if (!rawJwt) {
        return null
    }
    let tokenPayload
    try {
        tokenPayload = jwtDispatcher(rawJwt)
    } catch {
        return null
    }
    if (remember) setAccountInfo(
        login,
        tokenPayload.hash,
        tokenPayload.hash2,
        tokenPayload.auctionID === null ? null : String(tokenPayload.auctionID),
        null
    )
    baseAPI.defaults.headers.common.Authorization = rawJwt;

    return tokenPayload

}
