import type {TokenPayload} from "../types/TokenPayload.ts";

export function jwtDispatcher(jwt: string): TokenPayload {
    const parts = jwt.split(".")

    const tokenHeader = JSON.parse(atob(parts[0]))
    const tokenPayload = JSON.parse(atob(parts[1]))

    if (!(tokenPayload instanceof Object) || !(tokenHeader instanceof Object))
        throw new Error("invalid jwt")

    return tokenPayload
}