import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

const useSignup = ()=> {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const navigate = useNavigate();
    const authCtx = useAuthContext()

    const signup = async(email, password) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch(process.env.REACT_APP_USER_BACKEND+'/signup', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        
        if(response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            authCtx.login(json)
            setIsLoading(false)
            setError(null)
            navigate('/')
        }

    }

    return {signup, isLoading, error}
}

export default useSignup