import type {FC} from "react";
import type {SingleViewProps} from "../../types/constants/TabConfig.ts";

const ProjectEditPage: FC<SingleViewProps> = ({entityId}) => {
    return <div>
        Edit Project {entityId}
    </div>
}

export default ProjectEditPage;