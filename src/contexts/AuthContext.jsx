import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading] = useState(false);
    const navigate = useNavigate();
    function login(email, password){
        setLoading(true);
        setTimeout(()=>{
            const name = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
            setUser({email, name});
            setLoading(false);
            navigate("/");
        }, 1000)
    }

    function logout(){
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
}