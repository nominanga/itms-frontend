import type {FC, ForwardRefExoticComponent, RefAttributes} from "react";
import HomePage from "../../pages/HomePage/HomePage.tsx";
import ProjectPage from "../../pages/ProjectPage/ProjectPage.tsx";
import TacticalResolutionsPage from "../../pages/TacticalResolutionsPage/TacticalResolutionsPage.tsx";
import TenderResolutionsPage from "../../pages/TenderResolutionsPage/TenderResolutionsPage.tsx";
import AuctionsPage from "../../pages/AuctionsPage/AuctionsPage.tsx";
import MiceRequestsPage from "../../pages/MiceRequestsPage/MiceRequestsPage.tsx";
import ProjectsSourcingPage from "../../pages/ProjectsSourcingPage/ProjectsSourcingPage.tsx";
import ProjectsDemandPage from "../../pages/ProjectsDemandPage/ProjectsDemandPage.tsx";
import MyProjectsPage from "../../pages/MyProjectsPage/MyProjectsPage.tsx";
import SavingsDirectPage from "../../pages/SavingsDirectPage/SavingsDirectPage.tsx";
import SavingsIndirectPage from "../../pages/SavingsIndirectPage/SavingsIndirectPage.tsx";
import PreferredSuppliersPage from "../../pages/PreferredSuppliersPage/PreferredSuppliersPage.tsx";
import IndicesPage from "../../pages/IndicesPage/IndicesPage.tsx";
import CurrenciesPage from "../../pages/CurrenciesPage/CurrenciesPage.tsx";
import KeywordsPage from "../../pages/KeywordsPage/KeywordsPage.tsx";
import LegalNoticesPage from "../../pages/LegalNoticesPage/LegalNoticesPage.tsx";
import MiceSuppliersPage from "../../pages/MiceSuppliersPage/MiceSuppliersPage.tsx";
import NewDemandOptionsPage from "../../pages/NewDemandOptionsPage/NewDemandOptionsPage.tsx";
import ProjectComplexitiesPage from "../../pages/ProjectComplexitiesPage/ProjectComplexitiesPage.tsx";
import ProjectTypesPage from "../../pages/ProjectTypesPage/ProjectTypesPage.tsx";
import TaxonomyPage from "../../pages/TaxonomyPage/TaxonomyPage.tsx";
import SettingsPage from "../../pages/SettingsPage/SettingsPage.tsx";
import NotificationsPage from "../../pages/NotificationsPage/NotificationsPage.tsx";
import InboxPage from "../../pages/InboxPage/InboxPage.tsx";
import ReportTemplatesPage from "../../pages/ReportTemplatesPage/ReportTemplatesPage.tsx";
import UsersPage from "../../pages/UsersPage/UsersPage.tsx";
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
    ClipboardList,
    MoveRight,
    Shuffle,
    Info,
    ThumbsUp,
    Coins,
    Tag,
    FileText,
    PersonStanding,
    ListOrdered,
    Diamond,
    Layers,
    Network,
    Settings,
    Bell,
    FileBarChart2,
    Users,
    Mail,
} from 'lucide-react';

export type LucideIconType = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>

export const TAB_CONFIG: Record<string, {component: FC | FC<SingleViewProps>, icon: LucideIconType}> = {
    "home": {component: HomePage, icon: House},
    "tactical_resolutions": {component: TacticalResolutionsPage, icon: Goal},
    "tender_resolutions": {component: TenderResolutionsPage, icon: Handshake},
    "auctions": {component: AuctionsPage, icon: Scale},
    "mice_requests": {component: MiceRequestsPage, icon: Gift},
    "projects_sourcing": {component: ProjectsSourcingPage, icon: UserSearch},
    "projects_demand": {component: ProjectsDemandPage, icon: ClipboardList},
    "my_projects": {component: MyProjectsPage, icon: UserStar},
    "savings_direct": {component: SavingsDirectPage, icon: MoveRight},
    "savings_indirect": {component: SavingsIndirectPage, icon: Shuffle},
    "preferred_suppliers": {component: PreferredSuppliersPage, icon: ThumbsUp},
    "indices": {component: IndicesPage, icon: Info},
    "project": {component: ProjectPage, icon: SquareChartGantt},
    "currencies": {component: CurrenciesPage, icon: Coins},
    "keywords": {component: KeywordsPage, icon: Tag},
    "legal_notices": {component: LegalNoticesPage, icon: FileText},
    "mice_suppliers": {component: MiceSuppliersPage, icon: PersonStanding},
    "new_demand_options": {component: NewDemandOptionsPage, icon: ListOrdered},
    "project_complexities": {component: ProjectComplexitiesPage, icon: Diamond},
    "project_types": {component: ProjectTypesPage, icon: Layers},
    "taxonomy": {component: TaxonomyPage, icon: Network},
    "settings": {component: SettingsPage, icon: Settings},
    "notifications": {component: NotificationsPage, icon: Bell},
    "inbox": {component: InboxPage, icon: Mail},
    "report_templates": {component: ReportTemplatesPage, icon: FileBarChart2},
    "users": {component: UsersPage, icon: Users},
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
