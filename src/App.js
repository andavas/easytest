import React from "react";
import "./App.css";
import ListaDesafios from "./components/Desafios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LineAxisOutlined } from "@mui/icons-material";
import axios from "axios";
import { useAuthContext } from "./context/authContext";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function App() {
  // const api = 'http://localhost:4000/api/challenges'
  // React.useEffect(() => {
  //   axios.get(api,{
  //     headers:{
  //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZGVzb25iQG1haWwuY29tIiwiaWF0IjoxNjYzMjA4MjYyLCJleHAiOjE2NjMyMTE4NjJ9.R29qqUrxUkfPECYB8UsYkCW70k3zYwG7dGf65UR0TEc'
  //     }
  //   }).then(response => console.log(response.data))
  // },[])

  const baseApi = "http://localhost:4000";
  const { loadingToken, token } = useAuthContext();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [desafio, setDesafio] = React.useState();

  const remapDesafio = (desafios) => {
    let elementos = [];
    desafios.forEach((desafio) => {
      elementos.push({
        nome: desafio.name,
        dificuldade: desafio.dificulty === 0 ? "Fácil" : desafio.dificulty === 1 ? "Médio" : "Difícil",
        pontuacao: desafio.score,
        tempo: desafio.time,
        reloads: desafio.reloads,
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
            err.response.data.statusCode === 401
              ? navigate("/login")
              : console.log(err);
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
        <CircularProgress/>
      )}
    </div>
  );
}
