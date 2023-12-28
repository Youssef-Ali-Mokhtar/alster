import { createContext } from "react";

export const authContext = createContext({
    login:()=>{}, 
    logout:()=>{},
    state:null
})

