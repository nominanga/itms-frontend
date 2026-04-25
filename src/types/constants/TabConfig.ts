import type {FC, ForwardRefExoticComponent, RefAttributes} from "react";
import HomePage from "../../pages/HomePage/HomePage.tsx";
import ProjectPage from "../../pages/ProjectPage/ProjectPage.tsx";
import type {TFunction} from "i18next";
import {type LucideProps, House, SquareChartGantt} from 'lucide-react';

export type LucideIconType = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>

export const TAB_CONFIG: Record<string, {component: FC | FC<SingleViewProps>, icon: LucideIconType}> = {
    "home": {component: HomePage, icon: House },
    "project": {component: ProjectPage, icon: SquareChartGantt},
};

export function parseTabName(tabName: string): { baseName: string; subId: string | null } {
    const [baseName, subId] = tabName.split(".");
    return { baseName, subId: subId ?? null };
}

export function getTranslatedTabName(
    tabName: string,
    translationFunc: TFunction<"translation", undefined>
) : string {
    const parsedTabName = parseTabName(tabName);
    const subIdString = parsedTabName.subId ?? "";
    return (translationFunc("tab_titles." + parsedTabName.baseName) +
        " " + subIdString).trim()
}

export function getTabIcon(tabName: string) {
    const parsedTabName = parseTabName(tabName);
    return TAB_CONFIG[parsedTabName.baseName].icon;
}

export interface SingleViewProps {
    entityId?: string;
}
