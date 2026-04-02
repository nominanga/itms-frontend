import {useTokenStore} from "../../store/TokenStore.ts";
import {Navigate} from "react-router-dom";


const AuthRedirect = ({children}: React.PropsWithChildren) => {
    const tokenPayload = useTokenStore(state => state.tokenPayload)
    if (tokenPayload === null) {
        return <Navigate to={"/"}/>
    }
    return <>{children}</>
}

export default AuthRedirect