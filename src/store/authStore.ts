import {create} from "zustand"

interface AuthState {
    authToken: string | null
    setToken: (token: string) => void
    removeToken: () => void
}

const useAuthStore = create<AuthState>((set) => ({
    authToken: localStorage.getItem("token") ?? null,
    setToken: (token: string) => {
        localStorage.setItem("token", token)
        set({authToken: token})
    },
    removeToken: () => {
        localStorage.removeItem("token")
        set({authToken: null})
    }
}))

export default useAuthStore
