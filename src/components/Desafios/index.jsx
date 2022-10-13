import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";

const ListaDesafios = (props) => {
  const baseApi = "http://localhost:4000";
  const { userInfo, token, loadingToken } = useAuthContext();
  const navigate = useNavigate();

  const handleChallengeSelect = (desafio) => {
    axios
      .post(baseApi + "/api/games",  {
        userID: userInfo.id,
        challengeID: desafio.id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        desafio["gameID"] = response.data.id;
        navigate("/desafio", { state: { desafio } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(async () => {
    if (!loadingToken) {
      if (token === null) {
        navigate("/login");
      } 
    }
  }, [loadingToken]);

  if (!token) {
    return <></>;
  }

  return (
    <div id="desafiosContainer">
      {props.desafios.map((desafio) => (
        <Card
          key={desafio.nome}
          style={{ background: "#ddd" }}
          className="desafioItem"
        >
          <CardContent>
            <Typography>{desafio.nome}</Typography>
            <Typography>{desafio.dificuldade}</Typography>
          </CardContent>
          <CardActions className="desafioButtons">
            <Button onClick={() => handleChallengeSelect(desafio)}>
              Jogar
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default ListaDesafios;
