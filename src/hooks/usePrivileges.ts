import { useTokenStore } from "../store/TokenStore";

export const usePrivileges = () => {
    const roleNames = useTokenStore(s => s.tokenPayload?.roleNames ?? []);

    const hasAnyRole = (...roles: string[]) =>
        roles.some(r => roleNames.includes(r));

    const isAdmin =       hasAnyRole("Administrator");
    const isProcurement = hasAnyRole("Administrator", "Procurement", "ProcurementAdmin");
    const isFinance =     hasAnyRole("Administrator", "Procurement", "ProcurementAdmin",
                                     "OPSFinance", "OPSFinanceAdmin", "Product");
    const canSeeDicts =   hasAnyRole("Administrator", "ProcurementAdmin", "OPSFinanceAdmin", "Procurement");

    return { isAdmin, isProcurement, isFinance, canSeeDicts, hasAnyRole };
};
