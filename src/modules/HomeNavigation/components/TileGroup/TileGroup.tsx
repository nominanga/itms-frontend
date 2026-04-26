import GroupTitle from "../../ui/GroupTitle/GroupTitle.tsx";
import type {FC} from "react";
import "./TileGroup.css"

interface TileGroupProps extends React.PropsWithChildren {
    title: string;
    style?: React.CSSProperties;  // add this
}

const TileGroup: FC<TileGroupProps> = (props) => {
    return <div className="tile-group" style={props.style}>
        <GroupTitle>{props.title}</GroupTitle>
        <div className="tiles">
            {props.children}
        </div>
    </div>
}

export default TileGroup;