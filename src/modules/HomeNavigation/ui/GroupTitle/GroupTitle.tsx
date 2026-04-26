import type {FC} from "react";
import "./GroupTitle.css"

const GroupTitle: FC<React.PropsWithChildren> = (props) => {
    return <h1 className={"group-title"}>{props.children ?? ""}</h1>
}

export default GroupTitle