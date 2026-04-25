import {type FC, useEffect, useState} from "react";
import React from "react";
import TabBar from "../../ui/TabBar/TabBar.tsx";
import {useTabStore} from "../../../../store/TabStore.ts";
import Tab from "../../ui/Tab/Tab.tsx";
import {useTranslation} from "react-i18next";
import {getTabIcon, getTranslatedTabName} from "../../../../types/constants/TabConfig.ts";
import {SmallTabSize, TabGapSize} from "../../../../types/constants/layoutConstants.ts";

const TabSystem: FC = () => {
    const {tabs, currentTab, selectTab, closeTab} = useTabStore(state => state)

    const countMaxVisibleTabsAmount = () =>  {
        const oneTabSize = SmallTabSize + TabGapSize
        return Math.floor((window.innerWidth - 4) / oneTabSize)
    }

    const [maxVisibleTabsAmount, setMaxVisibleTabsAmount] = useState<number>(countMaxVisibleTabsAmount())

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => setMaxVisibleTabsAmount(countMaxVisibleTabsAmount())
        )

        return () =>
            window.removeEventListener(
                "resize",
                () => setMaxVisibleTabsAmount(countMaxVisibleTabsAmount())
            )
    }, []);

    const {t} = useTranslation()


    return <TabBar>
        {tabs.slice(0, maxVisibleTabsAmount).map((tabCode) =>
            (
                <React.Fragment key={tabCode}>
                    <Tab
                        tabTitle={getTranslatedTabName(tabCode, t)}
                        select={() => selectTab(tabCode)}
                        close={() => closeTab(tabCode)}
                        isActive={currentTab === tabCode}
                        icon={getTabIcon(tabCode)}
                    />
                </React.Fragment>
            )
        )}
    </TabBar>
}

export default TabSystem;