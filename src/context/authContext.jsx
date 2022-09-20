import React from "react";

const AuthContext = React.createContext({});

export function GlobalProvider({ children }) {
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem("token"));

    setToken(storedToken);
  }, []);

  function saveToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
    setToken(token);
  }

  function clearToken() {
    localStorage.setItem("token", '');
    setToken('');
  }


  return (
    <AuthContext.Provider value={{ token, saveToken, clearToken }} >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = React.useContext(AuthContext);
  return context;
}
