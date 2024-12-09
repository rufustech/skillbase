import { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Create a provider component
export function UserProvider({ children }) {
  const [username, setUsername] = useState("");

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}
