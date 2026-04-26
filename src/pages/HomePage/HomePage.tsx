import GroupTitle from "../../modules/HomeNavigation/ui/GroupTitle/GroupTitle.tsx";
import "./HomePage.css"
import NavigationTile from "../../modules/HomeNavigation/ui/NavigationTile/NavigationTile.tsx";
import {SquareChartGantt} from "lucide-react";

const HomePage = () => {

    return <div className={"home-page"}>
        <GroupTitle>Resolutions</GroupTitle>
        <NavigationTile tabName={"project.1"} icon={SquareChartGantt}/>
    </div>
}

export default HomePage;