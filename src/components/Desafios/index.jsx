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

const ListaDesafios = (props) => {
  const navigate = useNavigate();

  const handleChallengeSelect = (desafio) => {
    navigate("/desafio", { state: { desafio } });
  };


  return (
    <div id="desafiosContainer">
      {props.desafios.map((desafio) => (
        <Card key={desafio.nome} className='desafioItem'>
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
