/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const navigate=useNavigate()

  useEffect(() => {
    axios
      .get("/auth/me")
      .then((response) => setUser(response.data.user))
      .catch((error) => {
        console.log("Error fetching user:", error);
            });
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post("/login", credentials);
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error("Login failed:", error);
      throw error; 
    }
  };

  const logout = async () => {
    await axios.post("/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
