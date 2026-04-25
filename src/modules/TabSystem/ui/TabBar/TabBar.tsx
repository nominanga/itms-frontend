import type {FC} from "react";
import "./TabBar.css"

const TabBar: FC<React.PropsWithChildren> = ({children}) => {

    return <div className={"tab-bar"}>
        {children}
    </div>
}

export default TabBar