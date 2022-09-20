import { Button, Input } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useAuthContext } from "../../context/authContext";
import "./styles.css";

const Login = () => {
  const baseApi = "http://localhost:4000";
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { clearToken, saveToken } = useAuthContext();

  const handleLogin = () => {
    setLoading(true);
    clearToken()
    axios
      .post(baseApi + "/api/auth/login", {
        data: {
          email,
          password,
        },
      })
      .then((response) => {
        console.log(response)
        if (response.status === 201){
            saveToken(response.data.access_token);
            navigate('/')
        } else {

        }
        
      });
  };

  return (
    <div className="loginContainer">
      <Header />
      <div className="loginForm">
        <Input
          placeholder="Email"
          disabled={loading}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input.Password
          placeholder="Senha"
          disabled={loading}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="primary" loading={loading} onClick={handleLogin}>
          Entrar
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
