import useAuthStore from "../store/authStore.ts";
import {useNavigate} from "react-router-dom";

const AuthRedirect = ({children}: React.PropsWithChildren) => {
    const token = useAuthStore(state => state.authToken)
    const navigate = useNavigate()

    if (!token) navigate("/")

    return children
}

export default AuthRedirect