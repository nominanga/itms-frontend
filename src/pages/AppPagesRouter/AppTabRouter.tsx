import type { FC } from "react";
import {parseTab, type SingleViewProps, TAB_CONFIG} from "../../types/constants/TabConfig.ts";

interface IAppTabRouter {
    tabName: keyof typeof TAB_CONFIG;
}

const AppTabRouter: FC<IAppTabRouter> = ({ tabName }) => {
    const { baseName, subId } = parseTab(tabName);
    const config = TAB_CONFIG[baseName];

    const TabPage = config.component as FC<SingleViewProps>;
    return <TabPage entityId={subId!} />;
};

export default AppTabRouter;