import type {FC} from "react";
import HomePage from "../../pages/HomePage/HomePage.tsx";
import ProjectEditPage from "../../pages/ProjectEditPage/ProjectEditPage.tsx";

export const TAB_CONFIG: Record<string, { title: string; component: FC | FC<SingleViewProps>}> = {
    "home": { title: "Home Page", component: HomePage },
    "project-edit": { title: "Edit Project", component: ProjectEditPage }
};

export function parseTab(pageName: string): { baseName: string; subId: string | null } {
    const [baseName, subId] = pageName.split(".");
    return { baseName, subId: subId ?? null };
}

export function getTabTitle(pageName: keyof typeof TAB_CONFIG): string {
    const { baseName } = parseTab(pageName);
    return TAB_CONFIG[baseName].title;
}

export interface SingleViewProps {
    entityId?: string;
}