import {LoginCardForm} from "../../modules/LoginCardForm";
import {getAccountInfo} from "../../utils/storageAccountInfo.ts";
import {Navigate} from "react-router-dom";

const LoginPage = () => {

    if (getAccountInfo() !== null) return <Navigate to={"/"}/>

    return (
        <div>
            <LoginCardForm/>
        </div>
    )
}

export default LoginPage