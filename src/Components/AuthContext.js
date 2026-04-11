import { createContext, useContext, useState, useCallback, useEffect } from "react";
import axiosInstance from "../lib/instance";
import PreLoader from "./Preloader";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading,setLoading]=useState(true);

  const getUserData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/auth/me");
      if (response?.data.success) {
        setUser(response?.data?.user);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message;
      console.log(errorMessage);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async ({ email, password }) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      console.log(response);
      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        await getUserData();
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message;
      throw errorMessage;
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [getUserData]);

  const registerUser = async ({ name, email, password, address, role }) => {
    try {
      const res = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
        address,
        role,
      });
      return res;
    } catch (error) {
      console.error(error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message;
      throw errorMessage;
    }
  };

    const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, registerUser, logout }}>
      {loading ? <PreLoader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
