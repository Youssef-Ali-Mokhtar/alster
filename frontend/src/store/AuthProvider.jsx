import { authContext } from "./auth-context";
import { useReducer, useEffect } from "react";

const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null}
        default:
            return state
    }
}

const initialReducerValue = {
    user: null
}

const AuthProvider = ({children})=> {
    const [state, dispatch] = useReducer(authReducer, initialReducerValue)
    console.log('AuthContext state', state)

    const loginHandle = (user)=>{
        dispatch({type: 'LOGIN', payload:user})
    }
    const logoutHandle = ()=>{
        dispatch({type: 'LOGOUT'})
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user) {
            loginHandle(user)
        }
    },[])

    const authValue = {
        login: loginHandle,
        logout: logoutHandle,
        state: state
    }

    return (<authContext.Provider value={authValue}>
        { children }
    </authContext.Provider>)
}

export default AuthProvider