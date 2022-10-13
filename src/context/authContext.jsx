import React from "react";

const AuthContext = React.createContext({});

/*
userinfo: {
  id: string,
  name: string,
  email: string,
 */

export function AuthProvider({ children }) {
  const [token, setToken] = React.useState(null);
  const [loadingToken, setLoadingToken] = React.useState(true);
  const [userInfo, setUserInfo] = React.useState({});

  React.useEffect(() => {
    const rawtoken = localStorage.getItem("token");
    if (rawtoken) {
      const storedToken = JSON.parse(rawtoken);
      setToken(storedToken);
    }
    const rawuserinfo = localStorage.getItem("userInfo");
    if (rawuserinfo) {
      const storedUserinfo = JSON.parse(rawuserinfo);
      setUserInfo(storedUserinfo);
    }
    setLoadingToken(false);
  }, []);

  function saveToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
    setToken(token);
  }

  function clearToken() {
    localStorage.setItem("token", "");
    setToken("");
  }

  function saveUserInfo(userInfo) {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setToken(userInfo);
  }

  function clearUserInfo() {
    localStorage.setItem("userInfo", "");
    setToken("");
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        loadingToken,
        userInfo,
        saveUserInfo,
        clearUserInfo,
        saveToken,
        clearToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = React.useContext(AuthContext);
  return context;
}
