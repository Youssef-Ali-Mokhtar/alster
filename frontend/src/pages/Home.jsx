
// import { useLoaderData } from "react-router-dom";
import ProductsList from "./ProductsList";
import { useState, useEffect } from "react";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const fetchProducts = ()=>{
            fetch(process.env.REACT_APP_PRODUCT_BACKEND)
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                setProducts(data);
            })
            .catch(error=>{
                console.log(error);
            })
        }

        fetchProducts();
    }, [])

    // const data = useLoaderData();
    return ( <div>
        {
            products && <ProductsList data = {products}/>
        }
    </div> );
}
 
export default Home;

// export const homeLoader = async() => {
//     const data = await fetch('http://localhost:4000/api/products/')
//     return data.json();
// };

