import { createContext, useContext, useState } from "react";

const AuthContext=createContext()

export const AuthContextPro=({children})=>{
    const[currentUser,setCurrentUser]=useState(
        JSON.parse(localStorage.getItem('currentUser')||true)
    )


    const logout=()=>{
        setCurrentUser(null)
        localStorage.removeItem('currentUser')
    }

    return(
        <AuthContext.Provider value={{currentUser,setCurrentUser,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext)