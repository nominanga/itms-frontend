import {create} from "zustand/react";
import {tabsKey} from "../types/constants.ts";

const initialTabs: string[] = JSON.parse(localStorage.getItem(tabsKey) ?? "[]") || ["home"];

interface ITabStore {
    tabs: string[]
    currentTab: string | null
    openTab: (tab: string, tabs: string[]) => void
    closeTab: (tab: string, tabs: string[]) => void
    selectTab: (tab: string, tabs: string[]) => void
}

export const useTabStore = create<ITabStore>()((set) => ({
    tabs: initialTabs,
    currentTab: initialTabs[0],
    openTab: function (tab: string) {
        if (this.tabs.includes(tab)) {
            set(state => ({...state, currentTab: tab}))
        }
        set(state => ({...state, tabs: [...this.tabs, tab], currentTab: tab}))
    },
    closeTab: function (tabToClose: string) {
        const closeTabIndex = this.tabs.indexOf(tabToClose)
        const tabToSelect  = closeTabIndex > 0 ? this.tabs[closeTabIndex - 1] : null
        const updatedTabs = this.tabs.filter((tab) => tab !== tabToClose)
        set(state => ({...state, tabs: updatedTabs, currentTab: tabToSelect}))
    },

    selectTab: function (tab: string) {
        if (!this.tabs.includes(tab)) return
        set(state => ({...state, currentTab: tab}))
    }
}))