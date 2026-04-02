import {useNavigate} from "react-router-dom";
import type {ItmsSearchParams} from "../types/ItmsSearchParams.ts";

const paramToPage: Partial<Record<keyof ItmsSearchParams, string>> = {
    rfpID: "/rfp",
    mrID: "/mice",
    sID: "/survey",
    psGuid: "/projectSupplier"
}

export const useRedirect = () => {
    const navigate = useNavigate();
    return function(savedSearchParams: ItmsSearchParams) {

        for (const key of Object.keys(paramToPage) as (keyof typeof paramToPage)[]) {
            if (savedSearchParams[key] !== null) {
                return navigate(paramToPage[key]!)
            }
        }
        return navigate("/app")
    }
}