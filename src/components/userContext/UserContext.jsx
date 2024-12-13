import { createContext, useContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

// Create a provider component
export function UserProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("userToken") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");

  // Check if the token exists to set the login state
  const isLoggedIn = !!token;

  // Save token and email to localStorage whenever they change
  useEffect(() => {
    if (token) {
      localStorage.setItem("userToken", token);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("userToken");
      localStorage.removeItem("email");
    }
  }, [token, email]);

  return (
    <UserContext.Provider value={{ token, setToken, email, setEmail, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom Hook to use UserContext
export function useUserContext() {
  return useContext(UserContext);
}
