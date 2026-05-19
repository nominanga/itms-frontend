import TileGroup from "../TileGroup/TileGroup.tsx";
import NavigationTile from "../../ui/NavigationTile/NavigationTile.tsx";
import "./TileGrid.css";
import {getTabIcon} from "../../../../types/constants/TabConfig.ts";
import {useTranslation} from "react-i18next";
import {usePrivileges} from "../../../../hooks/usePrivileges.ts";

// Given which slots in a 3-column row are occupied, returns the gridColumn
// span for each visible item so they fill the full row without gaps.
// Slot indices: 0=col1(2fr), 1=col2(1fr), 2=col3(1fr)
const rowColumns = (slots: boolean[]): string[] => {
    const visible = slots.map((v, i) => ({ v, i })).filter(x => x.v);
    if (visible.length === 0) return [];
    if (visible.length === 3) return ["1", "2", "3"];
    if (visible.length === 1) return ["1 / 4"];
    // two visible — assign contiguous spans that cover all 3 columns
    if (visible[0].i === 0 && visible[1].i === 1) return ["1 / 3", "3"];
    if (visible[0].i === 0 && visible[1].i === 2) return ["1 / 3", "3"];
    if (visible[0].i === 1 && visible[1].i === 2) return ["1 / 3", "3"];
    return ["1 / 3", "3"];
};

const TileGrid = () => {

    const { t } = useTranslation();
    const { isProcurement, isFinance } = usePrivileges();

    // Row 1: [Resolutions, Auctions, Mice]
    const row1 = rowColumns([isProcurement, isProcurement, true]);
    let r1i = 0;
    // Row 3: [Savings, Suppliers, Indices]
    const row3 = rowColumns([isFinance, true, true]);
    let r3i = 0;

    return (
        <div className="tile-grid">
            {isProcurement && (
                <TileGroup title={t("home_group_titles.resolutions")} style={{ gridColumn: row1[r1i++] }}>
                    <NavigationTile tabName="tactical_resolutions" icon={getTabIcon("tactical_resolutions")} />
                    <NavigationTile tabName="tender_resolutions" icon={getTabIcon("tender_resolutions")} />
                </TileGroup>
            )}

            {isProcurement && (
                <TileGroup title={t("home_group_titles.auctions")} style={{ gridColumn: row1[r1i++] }}>
                    <NavigationTile tabName="auctions" icon={getTabIcon("auctions")} />
                </TileGroup>
            )}

            <TileGroup title={t("home_group_titles.mice")} style={{ gridColumn: row1[r1i] }}>
                <NavigationTile tabName="mice_requests" icon={getTabIcon("mice_requests")} />
            </TileGroup>

            <TileGroup title={t("home_group_titles.projects")} style={{ gridColumn: "1 / 4" }}>
                {isProcurement && (
                    <NavigationTile tabName="projects_sourcing" icon={getTabIcon("projects_sourcing")} />
                )}
                <NavigationTile tabName="projects_demand" icon={getTabIcon("projects_demand")} />
                <NavigationTile tabName="my_projects" icon={getTabIcon("my_projects")} />
            </TileGroup>

            {isFinance && (
                <TileGroup title={t("home_group_titles.savings")} style={{ gridColumn: row3[r3i++] }}>
                    <NavigationTile tabName="savings_direct" icon={getTabIcon("savings_direct")} />
                    <NavigationTile tabName="savings_indirect" icon={getTabIcon("savings_indirect")} />
                </TileGroup>
            )}

            <TileGroup title={t("home_group_titles.suppliers")} style={{ gridColumn: row3[r3i++] }}>
                <NavigationTile tabName="preferred_suppliers" icon={getTabIcon("preferred_suppliers")} />
            </TileGroup>

            <TileGroup title={t("home_group_titles.indices")} style={{ gridColumn: row3[r3i] }}>
                <NavigationTile tabName="indices" icon={getTabIcon("indices")} />
            </TileGroup>
        </div>
    );
};

export default TileGrid;