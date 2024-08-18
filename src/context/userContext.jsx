import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken ? JSON.parse(savedToken) : null;
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(JSON.parse(savedToken));
    }
  }, []);

  const login = (tokenData) => {
    setToken(tokenData.token);
    localStorage.setItem("token", JSON.stringify(tokenData));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
