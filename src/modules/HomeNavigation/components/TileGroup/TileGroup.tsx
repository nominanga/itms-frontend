import GroupTitle from "../../ui/GroupTitle/GroupTitle.tsx";
import type {FC} from "react";

interface TileGroupProps extends React.PropsWithChildren {
    title: string;
}

const TileGroup: FC<TileGroupProps> = (props) => {
    return <div className={"tile-group"}>
        <GroupTitle>{props.title}</GroupTitle>
        <div className={"tiles"}>
            {props.children}
        </div>
    </div>
}

export default TileGroup;