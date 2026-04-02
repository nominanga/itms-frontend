import {create} from "zustand/react";
import type {ItmsSearchParams} from "../types/ItmsSearchParams.ts";

interface SearchParamsStore {
    params: ItmsSearchParams
    updateParams: (paramsToAdd: ItmsSearchParams) => void
    deleteParams: () => void
}

export const useSearchParamsStore = create<SearchParamsStore>()((set) => ({
    params: {
        NR: null,
        psGuid: null,
        rfpID: null,
        mrID: null,
        sID: null
    },
    updateParams: (paramsToAdd: Partial<ItmsSearchParams>) => set((state) =>
        ({...state, params: {...state.params, paramsToAdd}})),
    deleteParams: () => set({})
}))