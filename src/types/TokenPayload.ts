export interface TokenPayload {
    auctionID: number | null;
    aud: number | null;
    displayName: string;
    exp: number
    hash: string
    hash2: string
    isExternal: boolean
    iss: string
    login: string
    roleNames: string[]
    roles: number
    samAccountName: string
    sub: string
    userId: number
}