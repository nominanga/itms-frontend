import baseAPI from "../../api/baseAPI.ts";

export function jwtDispatch(jwt: string) {
    const parts = jwt.split(".")

    const tokenHeader = JSON.parse(atob(parts[0]))
    const tokenPayload = JSON.parse(atob(parts[0]))

    if (!(tokenPayload instanceof Object) || !(tokenHeader instanceof Object))
        throw new Error("invalid jwt")



    baseAPI.defaults.headers.common.Authorization = jwt;

}