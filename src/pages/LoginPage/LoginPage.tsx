import {LoginCardForm} from "../../modules/LoginCardForm";
import {getAccountInfo} from "../../utils/storageAccountInfo.ts";
import {Navigate} from "react-router-dom";
import "./LoginPage.css"

const LoginPage = () => {

    if (getAccountInfo() !== null) return <Navigate to={"/"}/>

    return (
        <div className="login-card-form-container">
            <LoginCardForm/>
        </div>
    )
}

export default LoginPage