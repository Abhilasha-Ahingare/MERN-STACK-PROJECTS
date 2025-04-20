import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const authorization = `Bearer ${token}`;

  const StoreToken = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLogIn = !!token;

  const LogOutUser = () => {
    setToken("");
    localStorage.removeItem(token);
  };

  const UserAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.message);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error fetching user data");
    }
  };

  const [services, setServices] = useState([]);

  const UserServices = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/data/service`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setServices(data.message);
      }
    } catch (error) {
      console.log(`frontend error`, error);
    }
  };

  useEffect(() => {
    UserServices();
    UserAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ StoreToken, LogOutUser, isLogIn, user, services, authorization,isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
