import TileGroup from "../TileGroup/TileGroup.tsx";
import NavigationTile from "../../ui/NavigationTile/NavigationTile.tsx";
import "./TileGrid.css";
import {getTabIcon} from "../../../../types/constants/TabConfig.ts";
import {useTranslation} from "react-i18next";

const TileGrid = () => {

    const { t } = useTranslation();

    return (
        <div className="tile-grid">
            <TileGroup title={t("home_group_titles.resolutions")} style={{ gridColumn: "1" }}>
                <NavigationTile tabName="tactical_resolutions" icon={getTabIcon("tactical_resolutions")} />
                <NavigationTile tabName="tender_resolutions" icon={getTabIcon("tender_resolutions")} />
            </TileGroup>

            <TileGroup title={t("home_group_titles.auctions")} style={{ gridColumn: "2" }}>
                <NavigationTile tabName="auctions" icon={getTabIcon("auctions")} />
            </TileGroup>

            <TileGroup title={t("home_group_titles.mice")} style={{ gridColumn: "3" }}>
                <NavigationTile tabName="mice_requests" icon={getTabIcon("mice_requests")} />
            </TileGroup>

            <TileGroup title={t("home_group_titles.projects")} style={{ gridColumn: "1 / 4" }}>
                <NavigationTile tabName="projects_sourcing" icon={getTabIcon("projects_sourcing")} />
                <NavigationTile tabName="projects_demand" icon={getTabIcon("projects_demand")} />
                <NavigationTile tabName="my_projects" icon={getTabIcon("my_projects")} />
            </TileGroup>

            <TileGroup title={t("home_group_titles.savings")} style={{ gridColumn: "1" }}>
                <NavigationTile tabName="savings_direct" icon={getTabIcon("savings_direct")} />
                <NavigationTile tabName="savings_indirect" icon={getTabIcon("savings_indirect")} />
            </TileGroup>

            <TileGroup title={t("home_group_titles.suppliers")} style={{ gridColumn: "2" }}>
                <NavigationTile tabName="preferred_suppliers" icon={getTabIcon("preferred_suppliers")} />
            </TileGroup>

            <TileGroup title={t("home_group_titles.indices")} style={{ gridColumn: "3" }}>
                <NavigationTile tabName="indices" icon={getTabIcon("indices")} />
            </TileGroup>
        </div>
    );
};

export default TileGrid;