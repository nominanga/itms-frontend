import {type FC} from "react";
import React from "react";
import TabBar from "../../ui/TabBar/TabBar.tsx";
import {useTabStore} from "../../../../store/TabStore.ts";
import Tab from "../../ui/Tab/Tab.tsx";
import {getTabTitle} from "../../../../types/constants/TabConfig.ts";


const TabSystem: FC = () => {
    const {tabs, currentTab, selectTab, closeTab} = useTabStore(state => state)

    return <TabBar>
        {tabs.map((tabCode) =>
            (
                <React.Fragment key={tabCode}>
                    <Tab
                        tabTitle={getTabTitle(tabCode)}
                        select={() => selectTab(tabCode)}
                        close={() => closeTab(tabCode)}
                        isActive={currentTab === tabCode}
                    />
                </React.Fragment>
            )
        )}
    </TabBar>
}

export default TabSystem;