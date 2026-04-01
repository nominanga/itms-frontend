import {accountKey} from "../types/constants.ts";
import type {StoredAccountInfo} from "../types/StoredAccountInfo.ts";

export function setAccountInfo(
    login: string,
    hash: string,
    hash2: string,
    auctionId: string,
    projectSupplierGuid: string | null,
) {
    const acct: StoredAccountInfo = {
        login,
        hash,
        hash2,
        auctionId,
        projectSupplierGuid
    }
    localStorage.setItem(accountKey, JSON.stringify(acct));
}

export function getAccountInfo(): StoredAccountInfo {
    return JSON.parse(localStorage.getItem(accountKey) ?? "")
}