import {removeAccountInfo} from "../../utils/storageAccountInfo.ts";
import {TabSystem} from "../../modules/TabSystem";
import {useTabStore} from "../../store/TabStore.ts";
import {Activity, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import AppTabRouter from "../AppPagesRouter/AppTabRouter.tsx";

const AppPage = () => {
    const {tabs, currentTab, openTab} = useTabStore(state => state)

    const [projectId, setProjectId] = useState<number>(0)

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
        <header>
            <button onClick={() => removeAccountInfo()}>logout</button>
        </header>
        <TabSystem/>
        <main>
            {tabs.map(tab => (
                <Activity key={tab} mode={currentTab === tab ? "visible" : "hidden"}>
                    <AppTabRouter tabName={tab}/>
                </Activity>
            ))}
            <button onClick={() => {
                openTab(`project-edit.${projectId}`)
                setProjectId(prevState => prevState + 1)
            }}>
                open projects page with index {projectId}
            </button>
        </main>
    </>)
}

export default AppPage