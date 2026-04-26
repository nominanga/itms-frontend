import {TabSystem} from "../../modules/TabSystem";
import {useTabStore} from "../../store/TabStore.ts";
import {Activity, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import AppTabRouter from "../AppPagesRouter/AppTabRouter.tsx";
import {Header} from "../../modules/Header"

const AppPage = () => {
    const {tabs, currentTab, openTab} = useTabStore(state => state)

    const [query, setQuery] = useSearchParams()

    useEffect(() => {
        openTab(query.get("page") ?? "home")
    }, [])

    useEffect(() => {
        setQuery((query) => {
            if (currentTab === null) {
                query.delete("page")
                return query
            }
            query.set("page", currentTab);
            return query;
        });
    }, [currentTab, setQuery])


    return (<>
        <Header/>
        <TabSystem/>
        {tabs.map(tab => (
            <Activity key={tab} mode={currentTab === tab ? "visible" : "hidden"}>
                <AppTabRouter tabName={tab}/>
            </Activity>
        ))}
    </>)
}

export default AppPage