import {create} from "zustand/react";
import type {ItmsSearchParams} from "../types/ItmsSearchParams.ts";

interface SearchParamsStore {
    params: Partial<ItmsSearchParams>
    updateParams: (paramsToAdd: Partial<ItmsSearchParams>) => void
    deleteParams: () => void
}

export const useSearchParamsStore = create<SearchParamsStore>()((set) => ({
    params: {},
    updateParams: (paramsToAdd: Partial<ItmsSearchParams>) => set((state) =>
        ({...state, params: {...state.params, paramsToAdd}})),
    deleteParams: () => set({})
}))