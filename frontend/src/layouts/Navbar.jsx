import {NavLink} from 'react-router-dom';
import navbarClasses from './Navbar.module.css';
import Switch from '@mui/material/Switch';
import { useContext } from 'react';
import { themeContext } from '../store/theme-context';
import { useAuthContext } from '../hooks/useAuthContext';
import useLogout from '../hooks/useLogout';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const Navbar = () => {
    const ctxThemeSwitch = useContext(themeContext)
    const { logout } = useLogout()
    const authCtx = useAuthContext();
    const themeSwitchHandler = ()=> {
        ctxThemeSwitch.themeHandler();   
    }
    return ( <nav className={`${navbarClasses['navbar']} ${ctxThemeSwitch.theme==='dark'?navbarClasses['dark']:''}`}>
        <NavLink
            to="/"
            style={({ isActive }) => {
                return isActive ? { color: "gold", fontWeight:'bold' } : {}
            }}
            >
            Home
        </NavLink>
        {authCtx.state.user &&
        <>
            <NavLink
                to="/profile"
                style={({ isActive }) => {
                    return isActive ? { color: "gold", fontWeight:'bold' } : {}
                }}
                >
                Profile
            </NavLink>
            <NavLink
            to="post"
            style={({ isActive }) => {
                return isActive ? { color: "gold", fontWeight:'bold' } : {};
            }}
            >
            Post
        </NavLink>
        </>
        }

        {!authCtx.state.user &&
            <>
                <NavLink
                    to="signup"
                    style={({ isActive }) => {
                        return isActive ? { color: "gold", fontWeight:'bold' } : {};
                    }}
                    >
                    Signup
                </NavLink>
                <NavLink
                    to="login"
                    style={({ isActive }) => {
                        return isActive ? { color: "gold", fontWeight:'bold' } : {};
                    }}
                    >
                    Login
                </NavLink>
            </>
        }

        { authCtx.state.user && <p onClick={logout} style={{cursor:'pointer'}}>
            Logout
        </p>}
        <Switch 
            {...label} 
            checked={ctxThemeSwitch.theme==='light'?true:false} 
            onChange={themeSwitchHandler} 
        />
    </nav> );
}
 
export default Navbar;