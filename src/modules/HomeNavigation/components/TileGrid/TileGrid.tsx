import TileGroup from "../TileGroup/TileGroup.tsx";
import NavigationTile from "../../ui/NavigationTile/NavigationTile.tsx";
import { SquareChartGantt } from "lucide-react";
import "./TileGrid.css";

const TileGrid = () => {
    return (
        <div className="tile-grid">
            {/* Row 1: Resolutions (2 tiles) | Auctions (1 tile) | Preferred suppliers (1 tile) */}
            <TileGroup title="Resolutions" style={{ gridColumn: "1" }}>
                <NavigationTile tabName="project.1" icon={SquareChartGantt} />
                <NavigationTile tabName="project.2" icon={SquareChartGantt} />
            </TileGroup>

            <TileGroup title="Auctions" style={{ gridColumn: "2" }}>
                <NavigationTile tabName="project.3" icon={SquareChartGantt} />
            </TileGroup>

            <TileGroup title="Preferred" style={{ gridColumn: "3" }}>
                <NavigationTile tabName="project.4" icon={SquareChartGantt} />
            </TileGroup>

            <TileGroup title="Projects" style={{ gridColumn: "1 / 4" }}>
                <NavigationTile tabName="project.5" icon={SquareChartGantt} />
                <NavigationTile tabName="project.6" icon={SquareChartGantt} />
                <NavigationTile tabName="project.7" icon={SquareChartGantt} />
            </TileGroup>

            <TileGroup title="Saving Declarations" style={{ gridColumn: "1" }}>
                <NavigationTile tabName="project.8" icon={SquareChartGantt} />
                <NavigationTile tabName="project.9" icon={SquareChartGantt} />
            </TileGroup>

            <TileGroup title="Mice Requests" style={{ gridColumn: "2" }}>
                <NavigationTile tabName="project.10" icon={SquareChartGantt} />
            </TileGroup>

            <TileGroup title="Indices" style={{ gridColumn: "3" }}>
                <NavigationTile tabName="project.11" icon={SquareChartGantt} />
            </TileGroup>
        </div>
    );
};

export default TileGrid;