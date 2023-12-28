import { useState } from "react";
import useLogin from "../hooks/useLogin";

const inputStyle = {
    padding:'10px', 
    margin:'2px'
};
const formStyle = {
    display:'flex', 
    flexDirection:'column', 
    justifyContent:'center', 
    alignItems: 'center'
}
const buttonStyle = {
    background:'lightblue', 
    cursor: 'pointer', 
    border:'none', 
    borderRadius:'5px',
    width:'80px'
}

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const { login, isLoading, error } = useLogin()

    const handleSubmit = async(e)=> {
        e.preventDefault()
        await login(credentials.email, credentials.password)
    }

    const changeHandler = (type, e)=> {
        setCredentials(prev => {
          return {...prev, [type]:e.target.value}
        })
    }
    console.log(credentials);

    return ( <div>
        <form onSubmit={handleSubmit} style={formStyle}>
            <input 
                type="email" value={credentials.email} 
                onChange={changeHandler.bind(null, 'email')}
                style={inputStyle} required
            />
            <input 
                type="password" value={credentials.password} 
                onChange={changeHandler.bind(null, 'password')}
                style={inputStyle} required
            />
            <button disabled={isLoading} style={{...inputStyle, ...buttonStyle}}>Login</button>
            {error && <p>{error}</p>}
        </form>
    </div> );
}
 
export default Login;