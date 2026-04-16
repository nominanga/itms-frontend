import {create} from "zustand/react";
import {tabsKey} from "../types/constants/localStorageConstants.ts";

const storedTabs: string[] = JSON.parse(localStorage.getItem(tabsKey) ?? "[]")
const initialTabs: string[] = storedTabs.length === 0 ? ["home"] : storedTabs;

interface ITabStore {
    tabs: string[]
    currentTab: string | null
    openTab: (tab: string) => void
    closeTab: (tab: string) => void
    selectTab: (tab: string) => void
}

export const useTabStore = create<ITabStore>()((set) => ({
    tabs: initialTabs,
    currentTab: initialTabs[0],
    openTab: (tab: string) => {
        set(state => {
            if (state.tabs.includes(tab)) {
                return {...state, currentTab: tab}
            }
            const updatedTabs = [...state.tabs, tab]
            localStorage.setItem(tabsKey, JSON.stringify(updatedTabs))
            return {...state, tabs: updatedTabs, currentTab: tab}
        })
    },
    closeTab: (tabToClose: string) => {

        set(state => {
            const closeTabIndex = state.tabs.indexOf(tabToClose)
            let tabToSelect = state.currentTab
            if (tabToSelect === tabToClose) {
                tabToSelect  = closeTabIndex > 0 ? state.tabs[closeTabIndex - 1] : null
            }
            const updatedTabs = state.tabs.filter((tab) => tab !== tabToClose)
            localStorage.setItem(tabsKey, JSON.stringify(updatedTabs))
            return {...state, tabs: updatedTabs, currentTab: tabToSelect}
        })
    },

    selectTab: (tab: string)=> {
        set(state => ({...state, currentTab: tab}))
    }
}))