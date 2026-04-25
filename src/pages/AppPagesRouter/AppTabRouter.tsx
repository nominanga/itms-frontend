import type { FC } from "react";
import {parseTabName, TAB_CONFIG} from "../../types/constants/TabConfig.ts";

interface IAppTabRouter {
    tabName: keyof typeof TAB_CONFIG;
}

const AppTabRouter: FC<IAppTabRouter> = ({ tabName }) => {
    const { baseName, subId } = parseTabName(tabName);

    const TabPage = TAB_CONFIG[baseName].component;
    return <TabPage entityId={subId!} />;
};

export default AppTabRouter;