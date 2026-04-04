import {LoginCardForm} from "../../modules/LoginCardForm";
import {getAccountInfo} from "../../utils/storageAccountInfo.ts";
import {Navigate} from "react-router-dom";
import "./LoginPage.css"
import {useTokenStore} from "../../store/TokenStore.ts";

const LoginPage = () => {

    const tokenPayload= useTokenStore(state => state.tokenPayload)

    if (getAccountInfo() !== null || tokenPayload !== null) return <Navigate to={"/"}/>

    return (
        <div className="login-card-form-container">
            <LoginCardForm/>
        </div>
    )
}

export default LoginPage