import type {FC, ForwardRefExoticComponent, RefAttributes} from "react";
import HomePage from "../../pages/HomePage/HomePage.tsx";
import ProjectPage from "../../pages/ProjectPage/ProjectPage.tsx";
import type {TFunction} from "i18next";
import {
    type LucideProps,
    House,
    SquareChartGantt,
    Goal,
    Handshake,
    Scale,
    Gift,
    UserSearch,
    UserStar,
    FileQuestionMark, MoveRight, Shuffle, Info, ThumbsUp,

} from 'lucide-react';

export type LucideIconType = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>

export const TAB_CONFIG: Record<string, {component: FC | FC<SingleViewProps>, icon: LucideIconType}> = {
    "home": {component: HomePage, icon: House },
    "tactical_resolutions": {component: HomePage, icon: Goal},
    "tender_resolutions": {component: HomePage, icon: Handshake},
    "auctions": {component: HomePage, icon: Scale},
    "mice_requests": {component: HomePage, icon: Gift},
    "projects_sourcing": {component: HomePage, icon: UserSearch},
    "projects_demand": {component: HomePage, icon: FileQuestionMark},
    "my_projects": {component: HomePage, icon: UserStar},
    "savings_direct": {component: HomePage, icon: MoveRight},
    "savings_indirect": {component: HomePage, icon: Shuffle},
    "preferred_suppliers": {component: HomePage, icon: ThumbsUp},
    "indices": {component: HomePage, icon: Info},
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
