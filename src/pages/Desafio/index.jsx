import React from "react";
import PyComp from "../../components/PyComp";
import dedent from "dedent-js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Desafio.css";

import { Spinner } from "react-bootstrap";
import Editor from "../../components/Editor";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { Button } from "antd";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";

const codePreamble = `
import sys, io
import unittest
import __main__

def print(content):
  return content
`;
const codeEpilogue = `
suite = unittest.TestLoader().loadTestsFromModule(__main__)
old_stdout = sys.stdout
new_stdout = io.StringIO()
sys.stdout = new_stdout
unittest.TextTestRunner(stream=new_stdout).run(suite)
output = new_stdout.getvalue()
sys.stdout = old_stdout
print(f'{output}')
`;

export default function Desafio() {
  const baseApi = "http://localhost:4000";
  const { state } = useLocation();
  const { token } = useAuthContext();

  const [maincode, setEditorMain] = React.useState(state.desafio.code);
  const [testcode, setEditorTest] = React.useState(state.desafio.test);

  const [code, setCode] = React.useState(`
  def print(content):
    return content
  
  print(f'EasyTest!')
    `);
  const [isPyodideLoaded, setIsPyodideLoading] = React.useState(false);

  const handleMainClick = async () => {
    setCode(codePreamble + dedent(maincode)); // problema de indentação (ver dedent-js)
  };
  const handleTestClick = async () => {
    setCode(codePreamble + dedent(maincode + testcode + codeEpilogue));
  };

  const handlePyodideLoad = (value) => {
    setIsPyodideLoading(value);
  };

  const calculateScore = () => {
    axios.get(baseApi+'/api/games/'+state.desafio.gameID,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      const startedAt = new Date(response.data.createdAt);
      console.log(startedAt);
      const finishedAt = new Date();
      console.log(finishedAt);
      const score = (finishedAt - startedAt) / 1000 * (1 + (state.desafio.reloads / 10));
      return 0;// return score;
    })
  }

  const handleSubmitChallenge = () => {
    axios.put(baseApi+"/api/games", {
      id: state.desafio.gameID,
      score: calculateScore()
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {console.log("submit - "+response.data)});
  }

  return (
    <>
      <Header />
      <div className="desafio">
        <div id="desafioInfo">
          <div>{state.desafio.nome}</div>
          <div>{state.desafio.dificuldade}</div>
          <div>Reloads: {state.desafio.reloads}</div>
          <div>{state.desafio.tempo}</div>
        </div>
        <div id="AppEditors">
          <Editor
            code={maincode}
            handleCode={setEditorMain}
            isButtonDisabled={!isPyodideLoaded}
            handleButtonClick={handleMainClick}
            buttonText={"Rodar Código"}
          />
          <Editor
            code={testcode}
            handleCode={setEditorTest}
            isButtonDisabled={!isPyodideLoaded}
            handleButtonClick={handleTestClick}
            buttonText={"Rodar Teste"}
          />
        </div>
        <Button
        type="primary"
        onClick={handleSubmitChallenge}
        >
          Finalizar
        </Button>
        {!isPyodideLoaded ? (
          <Spinner
            style={{ margin: "0 0 10px 0" }}
            animation="border"
            variant="info"
          />
        ) : (
          <div style={{ margin: "0 0 42px 0" }}></div>
        )}
        <PyComp code={code} handlePyodideLoad={handlePyodideLoad} />
      </div>
    </>
  );
}
