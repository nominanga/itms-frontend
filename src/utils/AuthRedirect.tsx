import {useNavigate} from "react-router-dom";
import {accountKey} from "../types/constants.ts";

const AuthRedirect = ({children}: React.PropsWithChildren) => {

    const navigate = useNavigate()

    if (!localStorage.getItem(accountKey)) navigate("/login")

    return children
}

export default AuthRedirect