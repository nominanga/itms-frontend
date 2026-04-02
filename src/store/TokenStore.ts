import {create} from "zustand/react";
import type {TokenPayload} from "../types/TokenPayload.ts";

interface ITokenStore {
    tokenPayload: TokenPayload | null;
    updateTokenPayload: (newTokenPayload: TokenPayload) => void;
    removeToken: () => void;
}

export const useTokenStore = create<ITokenStore>()((set) => ({
    tokenPayload: null,
    updateTokenPayload: (newTokenPayload) => set({tokenPayload: newTokenPayload}),
    removeToken: () => set({tokenPayload: null})
}))
