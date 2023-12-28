import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

const useLogout = ()=> {
    const authCtx = useAuthContext()
    const navigate = useNavigate()
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')
        authCtx.logout()
        navigate('/login')
    }

    return { logout }
}

export default useLogout