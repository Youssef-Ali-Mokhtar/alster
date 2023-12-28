import { useState } from "react";
import useSignup from "../hooks/useSignup";

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

const Signup = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const {signup, isLoading, error} = useSignup()

    const handleSubmit = async(e)=> {
        e.preventDefault()
        await signup(credentials.email, credentials.password);
    }

    const changeHandler = (type, e)=> {
        setCredentials(prev => {
          return {...prev, [type]:e.target.value}
        })
    }

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
            <button style={{...inputStyle, ...buttonStyle}} disabled={isLoading}>Sign Up</button>
            {error && <p>{error}</p>}
        </form>
    </div> );
}
 
export default Signup;