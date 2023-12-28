
// import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const buttonStyle = {padding:'5px 10px', margin:'2px'}

const ProductDetails = () => {
    const [details, setDetails] = useState({});
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    const  {state} = useAuthContext()
    const token = state.user?.token
    const currentUserId = state.user?.user_id
    const productUserId = details.user_id
    const authorized = currentUserId === productUserId

    console.log(authorized)
    useEffect(()=>{
        const fetchDetails = ()=> {
            fetch(`${process.env.REACT_APP_PRODUCT_BACKEND}/${id}`)
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    setDetails(data);
                })
                .catch((error)=>{
                    console.log(error);
                })
        }

        fetchDetails();
    }, [id, edit])

    const updateProduct = ()=> {
        fetch(`${process.env.REACT_APP_PRODUCT_BACKEND}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(details),
            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                setDetails(data);
                setEdit(false)
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const deleteProduct = ()=> {
        fetch(`${process.env.REACT_APP_PRODUCT_BACKEND}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            .then((response)=>{
                if(!response.ok) {
                    throw Error("Shit happened")
                }
                return response.json();
            })
            .then((data)=>{
                console.log(data);
                navigate('/');
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const cancelHandler = ()=> {
        setEdit(false);
    }

    const editHandler = ()=> {
        setEdit(true);
    }

    const changeHandler = (type, e)=> {
        setDetails(prev => {
          return {...prev, [type]:e.target.value}
        })
      }

    return ( <div>
        {edit && <form style={{display:'flex', flexDirection:'column'}}>
            <input onChange={changeHandler.bind(null, 'name')} value={details.name} type='text' name='name' style={{padding:'10px'}} required/>
            <input onChange={changeHandler.bind(null, 'type')} value={details.type} type='text' name='type' style={{padding:'10px'}} required/>
            <input onChange={changeHandler.bind(null, 'price')} value={details.price} type='number' name='price' style={{padding:'10px'}} required/>
        </form>}
        {!edit && <>
            <h1>{details.name}</h1>
            <h1>{details.type}</h1>
            <h1>{details.price}</h1>
        </>}
        {
            state.user && authorized &&
            <>
                {!edit && <button style={buttonStyle} onClick={editHandler}>edit</button>}
                {!edit && <button style={buttonStyle} onClick={deleteProduct}>delete</button>}
                {edit && <button style={buttonStyle} onClick={cancelHandler}>cancel</button>}
                {edit && <button style={buttonStyle} onClick={updateProduct}>update</button>}
            </>
        }

    </div> );
}
 
export default ProductDetails;

// export const ProductDetailsLoader = async(params)=> {
//     const id = params.params.id;
//     console.log(id);
//     const data = await fetch(`http://localhost:4000/api/products/${id}`);
//     return data.json();
// }