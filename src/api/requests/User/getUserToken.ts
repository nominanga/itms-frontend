import baseAPI from "../../baseAPI.ts";
import type {ApiResponse} from "../../../types/apiTypes.ts";

export async function getUserToken(
    login: string,
    password: string,
    s?: boolean,
    auctionId?: string | null,
    psguID?: string | null
) {
    return await baseAPI.get<ApiResponse<string>>(`/User/Token/${encodeURIComponent(login)}`, {
        params: {
            "Password": password,
            "S": s || false,
            "AuctionID": auctionId ?? "",
            "ProjectSupplierGUID": psguID ?? ""
        }
    })
}
