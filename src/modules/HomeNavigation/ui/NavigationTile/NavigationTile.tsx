import {type FC} from "react";
import {getTranslatedTabName, type LucideIconType} from "../../../../types/constants/TabConfig.ts";
import {useTabStore} from "../../../../store/TabStore.ts";
import {useTranslation} from "react-i18next";
import "./NavigationTile.css"


interface NavigationTileProps {
    icon: LucideIconType
    tabName: string
}

const NavigationTile: FC<NavigationTileProps> = ({tabName, icon}) => {

    const openTab = useTabStore(state => state.openTab)

    const IconComponent = icon

    const {t} = useTranslation()

    return <button onClick={() => openTab(tabName)} className={"navigation-tile"}>
        <IconComponent size={60} className={"tile-icon"} color={"#303F9F"} strokeWidth={2}/>
        <h2 className={"tile-name"}>{getTranslatedTabName(tabName, t)}</h2>
    </button>
}

export default NavigationTile;