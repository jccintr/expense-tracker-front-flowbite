import { createContext,useState,useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

   //const [loggedUser,setLoggedUser] = useState(null);
   const [loggedUser, setLoggedUser] = useState(() => {
        const savedUser = localStorage.getItem('loggedUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });
   // const [token,setToken] = useState(null);
    const [token,setToken] = useState(() => {
        const savedUser = localStorage.getItem('token');
        return savedUser ? JSON.parse(savedUser) : null;
    }); 

    // Salva no localStorage sempre que loggedUser mudar
    useEffect(() => {
        if (loggedUser) {
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
           
        } else {
            localStorage.removeItem('loggedUser');
        }
    }, [loggedUser]);

    // Salva no localStorage sempre que token mudar
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', JSON.stringify(token));
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);
    
    



   return (
    <AuthContext.Provider value={{loggedUser, setLoggedUser,token,setToken}}>
      {children}
    </AuthContext.Provider>
)
}

export default AuthContext;