import {create} from "zustand/react";
import type {TokenPayload} from "../types/TokenPayload.ts";

interface ITokenStore {
    tokenPayload: Partial<TokenPayload>;
    updateTokenPayload: (newTokenPayload: Partial<TokenPayload>) => void;
    removeToken: () => void;
}

export const useTokenStore = create<ITokenStore>()((set) => ({
    tokenPayload: {},
    updateTokenPayload: (newTokenPayload) => set({tokenPayload: newTokenPayload}),
    removeToken: () => set({tokenPayload: {}})
}))

// check how to work with zustand
