import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

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

const Post = () => {
    const [product, setProduct] = useState({name:'', type:'', price:''})
    const navigate = useNavigate()
    const {state} = useAuthContext()
    const token = state.user?.token
    const handleSubmit = (e)=> {
      e.preventDefault();

        fetch(process.env.REACT_APP_PRODUCT_BACKEND+'/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(product),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json() // Parse the JSON in the response
          })
          .then((responseData) => {
            // Handle the data returned from the server
            console.log(responseData)
            navigate('/')
          })
          .catch((error) => {
            // Handle errors during the fetch
            console.error('There was a problem with the fetch operation:', error)
          });    
    };


    const changeHandler = (type, e)=> {
      setProduct(prev => {
        return {...prev, [type]:e.target.value}
      })
    }

    return ( <div>
        <form onSubmit={ handleSubmit } style={formStyle}>
            <input 
              onChange={changeHandler.bind(null, 'name')} 
              value={product.name} type='text' name='name' 
              style={inputStyle} required
            />
            <input 
              onChange={changeHandler.bind(null, 'type')} 
              value={product.type} type='text' name='type' 
              style={inputStyle} required
            />
            <input 
              onChange={changeHandler.bind(null, 'price')} 
              value={product.price} type='number' name='price' 
              style={inputStyle} required
            />
            <button style={{...inputStyle, ...buttonStyle}}>Submit</button>
        </form>
    </div> );
}
 
export default Post;

// export const postAction = async({ request })=> {
//     const data = await request.formData();
//     const submission = {
//         name: data.get('name'),
//         type: data.get('type'),
//         price: data.get('price'),
//     }
//     console.log(submission);
//     try {
//         const response = await fetch('http://localhost:4000/api/products', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(submission),
//         });
  
//         if (response.ok) {
//           console.log('POST request successful');
//           // Handle success (if needed)
//         } else {
//           console.error('POST request failed');
//           // Handle error (if needed)
//         }
//       } catch (error) {
//         console.error('Error during POST request:', error);
//         // Handle error (if needed)
//       }

//     return redirect('/');
// }