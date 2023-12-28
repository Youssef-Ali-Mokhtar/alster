import rootClasses from './RootLayout.module.css';
import {Outlet} from 'react-router-dom';
import Navbar from './Navbar';
import pageClasses from './Page.module.css';
import { themeContext } from '../store/theme-context';
import { useContext } from 'react';

const RootLayout = () => {
    const ctxThemeSwitch = useContext(themeContext);
    console.log(ctxThemeSwitch.theme);
    return ( <div className={`${rootClasses['layout']} ${ctxThemeSwitch.theme==='dark'?rootClasses['dark']:''}`}>
        <header>
            <Navbar/>
        </header>
        <main className={`${pageClasses['page']} ${ctxThemeSwitch.theme==='dark'?pageClasses['dark']:''}`}>
            <Outlet/>
        </main>
        
    </div> );
}
 
export default RootLayout;