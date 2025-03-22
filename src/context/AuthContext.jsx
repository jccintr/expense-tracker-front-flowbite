import { createContext,useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

   const [loggedUser,setLoggedUser] = useState(null);
   const [token,setToken] = useState(null);
      
   return (
    <AuthContext.Provider value={{loggedUser, setLoggedUser,token,setToken}}>
      {children}
    </AuthContext.Provider>
)
}

export default AuthContext;