import Product from "./Product";
import { Link } from "react-router-dom";
import Page from '../layouts/Page.module.css';
import { themeContext } from "../store/theme-context";
import { useContext } from "react";

const ProductsList = ({data}) => {
    const ctxThemeSwitch = useContext(themeContext);

    return ( <div>
        {
            data.map(item=>{
                return <Link
                    className={ctxThemeSwitch.theme==='dark'?Page['dark']:''}
                    key={item._id}
                    to={item._id}>
                        <Product item={item}/>
                    </Link>;
            })
        }
    </div> );
}
 
export default ProductsList;