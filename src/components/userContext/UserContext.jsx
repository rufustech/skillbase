// userContext/UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Use named import

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token); // Use named import

          // Check if token is expired
          if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            setUser(null);
          } else {
            setUser({
              id: decodedToken.id,
              username: decodedToken.username,
              role: decodedToken.role,
              email: decodedToken.email,
            });
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedIn", "true");
    const decodedToken = jwtDecode(token); // Use named import
    setUser({
      id: decodedToken.id,
      username: decodedToken.username,
      role: decodedToken.role,
      email: decodedToken.email,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isAdmin = user && ["trainer", "manager"].includes(user.role);
  const isAuthenticated = !!user;

  const contextValue = {
    user,
    setUser,
    login,
    logout,
    isAdmin,
    isAuthenticated,
    loading,
  };

  if (loading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
