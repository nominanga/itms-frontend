import type {FC} from "react";
import type {SingleViewProps} from "../../types/constants/TabConfig.ts";

const ProjectPage: FC<SingleViewProps> = ({entityId}) => {
    return <div className={"page-template"}>
        Edit Project {entityId}
    </div>
}

export default ProjectPage;