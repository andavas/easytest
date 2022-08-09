import React from "react";
import PyComp from "../../components/PyComp";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Desafio.css";

import { Spinner } from "react-bootstrap";
import Editor from "../../components/Editor";
import { useLocation } from "react-router-dom";

const codePreamble = `
import sys, io
import unittest
import __main__

def print(content):
  return content
`
const codeEpilogue = `
suite = unittest.TestLoader().loadTestsFromModule(__main__)
old_stdout = sys.stdout
new_stdout = io.StringIO()
sys.stdout = new_stdout
unittest.TextTestRunner(stream=new_stdout).run(suite)
output = new_stdout.getvalue()
sys.stdout = old_stdout
print(f'{output}')
`

export default function Desafio()  {

  const { state } = useLocation();

  const [maincode, setEditorMain] = React.useState(state.desafio.code);
  const [testcode, setEditorTest] = React.useState(state.desafio.test);

  const [code, setCode] = React.useState(`
  def print(content):
    return content
  
  print(f'EasyTest!')
    `);
  const [isPyodideLoaded, setIsPyodideLoading] = React.useState(false);

  const handleMainClick = async () => {
    setCode(codePreamble+maincode); // problema de indentação (ver dedent-js)
  };
  const handleTestClick = async () => {
    setCode(codePreamble+maincode+testcode+codeEpilogue);
  };

  const handlePyodideLoad = (value) => {
    setIsPyodideLoading(value);
  };

  return (
    <div className="desafio">
      <div id="desafioInfo">
        <div>{state.desafio.nome}</div>
        <div>{state.desafio.dificuldade}</div>
        <div>Pontos: {state.desafio.pontuacao}</div>
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
  );
};
