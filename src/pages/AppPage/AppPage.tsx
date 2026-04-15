import {removeAccountInfo} from "../../utils/storageAccountInfo.ts";

const AppPage = () => {



    return (
        <>
            <button onClick={() => removeAccountInfo()}>logout</button>
        </>
    )
}

export default AppPage