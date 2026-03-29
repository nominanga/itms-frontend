import {accountKey} from "../../types/constants.ts";
import {Navigate} from "react-router-dom";


const AppPage = () => {

    if (localStorage.getItem(accountKey)) return <Navigate to="/login"/>

    return (
        <>

        </>
    )
}

export default AppPage