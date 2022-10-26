import React from "react";
import "./App.css";
import ListaDesafios from "./components/Desafios";
import Header from "./components/Header";
import axios from "axios";
import { useAuthContext } from "./context/authContext";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function App() {
  const baseApi = "http://localhost:4000";
  const { loadingToken, token, clearToken, clearUserInfo } = useAuthContext();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [desafio, setDesafio] = React.useState();

  const remapDesafio = (desafios) => {
    let elementos = [];
    desafios.forEach((desafio) => {
      elementos.push({
        id: desafio.id,
        dificuldade: desafio.dificulty,
        tipo: desafio.type,
        nome: desafio.name,
        code: desafio.code,
        test: desafio.test,
      });
    });
    return elementos;
  };

  React.useEffect(async () => {
    if (!loadingToken) {
      if (token === null) {
        navigate("/login");
      } else {
        await axios
          .get(baseApi + "/api/challenges", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setDesafio(remapDesafio(response.data));
          })
          .catch((err) => {
            if (err.response.data.statusCode === 401) {
              navigate("/login");
              clearToken();
              clearUserInfo()
            } else {
              console.log(err);
            }
          });
      }
    }
  }, [loadingToken]);

  if (!token) {
    return <></>;
  }

  return (
    <div className="App">
      <Header />
      {desafio ? (
        <div className="ListaDesafiosContainer">
          <div>Desafios</div>
          <ListaDesafios desafios={desafio} />
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
