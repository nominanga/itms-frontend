import baseAPI from "../../../api/baseAPI.ts";
import type {ApiResponse} from "../../../types/apiTypes.ts";



export async function getUserToken(
    login: string,
    password: string,
    s?: boolean,
    auctionId?: number,
    psguID?: number
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
