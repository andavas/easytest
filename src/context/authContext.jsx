import React from "react";

const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
  const [token, setToken] = React.useState(null);
  const [loadingToken, setLoadingToken] = React.useState(true)


  React.useEffect(() => {
    const rawtoken = localStorage.getItem("token");
    if (rawtoken) {
      const storedToken = JSON.parse(rawtoken);
      setToken(storedToken);
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

  return (
    <AuthContext.Provider value={{ token, loadingToken, saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = React.useContext(AuthContext);
  return context;
}
