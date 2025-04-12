// userContext/UserContext.js
import  { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // or HTTP-only cookies
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // decode JWT
      setUser({ role: decodedToken.role, username: decodedToken.username });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
