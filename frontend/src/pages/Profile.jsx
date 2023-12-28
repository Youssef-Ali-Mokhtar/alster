import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {
    const [profile, setProfile] = useState('');
    const  {state} = useAuthContext()
    const token = state.user?.token
    useEffect(()=>{
        const fetchProfile = ()=>{
            console.log(`Bearer ${token}`)
            fetch(process.env.REACT_APP_USER_BACKEND+'/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                setProfile(data);
            })
            .catch(error=>{
                console.log(error);
            })
        }

        fetchProfile();
    }, [token])
    console.log(profile)
    // const data = useLoaderData();
    return ( <div>
        {profile.error?'': profile}
        {/* {profile} */}
    </div> );
}
 
export default Profile;