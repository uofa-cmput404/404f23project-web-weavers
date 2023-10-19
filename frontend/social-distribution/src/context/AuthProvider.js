import { createContext, useState } from "react";
const AuthContext = createContext({});

// NOT DONE
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}   

export default AuthContext;