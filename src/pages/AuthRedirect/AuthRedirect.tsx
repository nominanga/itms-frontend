import {useTokenStore} from "../../store/TokenStore.ts";
import {Navigate, useLocation} from "react-router-dom";


const AuthRedirect = ({children}: React.PropsWithChildren) => {
    const tokenPayload = useTokenStore(state => state.tokenPayload)

    const location = useLocation()

    if (tokenPayload === null)
        return <Navigate to={`/${location.search}`}/>

    return <>{children}</>
}

export default AuthRedirect