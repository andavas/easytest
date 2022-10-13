import { Button, Input, message } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useAuthContext } from "../../context/authContext";
import "./styles.css";

const Login = () => {
  const baseApi = "http://localhost:4000";
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [inputStatus, setInputStatus] = React.useState("");
  const { clearToken, saveToken, clearUserInfo, saveUserInfo } = useAuthContext();

  const handleLogin = () => {
    if (email === "" || password === "") {
      setInputStatus("error");
      message.error("Preencha todos os campos");
    } else {
      setInputStatus("");
      setLoading(true);
      clearToken();
      clearUserInfo();
      axios
        .post(baseApi + "/api/auth/login", {
          email,
          password,
        })
        .then((response) => {
          const {access_token, ...user} = response.data
          saveUserInfo(user);
          saveToken(access_token);
          navigate("/");
        })
        .catch((err) => {
          setInputStatus("error");
          setLoading(false);
          message.error(err.response.data.msg);
        });
    }
  };

  return (
    <div className="loginContainer">
      <Header />
      <div className="loginForm">
        <Input
          placeholder="Email"
          disabled={loading}
          value={email}
          status={inputStatus}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input.Password
          placeholder="Senha"
          disabled={loading}
          value={password}
          status={inputStatus}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="primary" loading={loading} onClick={handleLogin}>
          Entrar
        </Button>
      </div>
    </div>
  );
};

export default Login;
