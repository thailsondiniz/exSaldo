import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading] = useState(false);

    function login(email, password){
        setLoading(true);
        setTimeout(()=>{
            setUser({email});
            setLoading(false);
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