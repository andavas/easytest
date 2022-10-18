import React from "react";
import PyComp from "../../components/PyComp";
import dedent from "dedent-js";
import { Spinner } from "react-bootstrap";
import Editor from "../../components/Editor";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Desafio.css";
import { message, Popconfirm } from "antd";

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
  // env constants
  const baseApi = "http://localhost:4000";
  const { state } = useLocation();
  const { token } = useAuthContext();

  //editor state vars
  const [output, setOutput] = React.useState("Carregando Pyodide...");
  const [code, setCode] = React.useState(`
  def print(content):
    return content
  
  print(f'EasyTest!')
    `);
  const [isError, setIsError] = React.useState(false);
  const [loadingClearCode, setLoadingClearCode] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  //code vars
  const [maincode, setEditorMain] = React.useState(state.desafio.code);
  const [testcode, setEditorTest] = React.useState(state.desafio.test);

  //game state vars
  const [reloads, setReloads] = React.useState(0);

  //pyodide vars
  const [isPyodideLoaded, setIsPyodideLoading] = React.useState(false);

  //editor functions
  const handleMainClick = async () => {
    setCode(codePreamble + dedent(maincode));
  };
  const handleTestClick = async () => {
    setCode(codePreamble + dedent(maincode + testcode + codeEpilogue));
  };

  // pyodide functions
  const handlePyodideLoad = (value) => {
    setIsPyodideLoading(value);
  };

  const calculateScore = () => {
    axios
      .get(baseApi + "/api/games/" + state.desafio.gameID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const startedAt = new Date(response.data.createdAt);
        const finishedAt = new Date();
        const score = ((finishedAt - startedAt) / 1000) * (1 + reloads / 10);
        return 0;
      });
  };

  const checkOutput = () => {
    //if (output === "Carregando Pyodide...") - Erro ao carregar pyodide: recarregar página
    if (output === "EasyTest!") {
      message.warning(
        "Você deveria executar o código ao menos uma vez antes de finalizar!"
      );
      return false;
    } else if (isError) {
      setOpenConfirm(true);
      return true;
    }
  };

  const handleSubmitChallenge = () => {
    if (checkOutput()) {
      setConfirmLoading(true);
      axios
        .put(
          baseApi + "/api/games",
          {
            id: state.desafio.gameID,
            score: calculateScore(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("submit - " + response.data);
          message.success("Desafio finalizado com sucesso!");
        }).catch((error) => {
          message.error("Erro ao finalizar desafio!");
        });
        setOpenConfirm(false);
        setConfirmLoading(false);
    }
  };

  const handleReload = (editor) => {
    setLoadingClearCode(true);
    axios
      .get(baseApi + "/api/challenges/" + state.desafio.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (editor == "code") setEditorMain(response.data.code);
        else if (editor == "test") setEditorTest(response.data.test);
        setReloads(reloads + 1);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoadingClearCode(false);
  };

  return (
    <>
      <Header />
      <div className="desafio">
        <div id="desafioInfo">
          <div>{state.desafio.nome}</div>
          <div>{state.desafio.dificuldade}</div>
          <div>Reloads: {reloads}</div>
        </div>
        <div id="AppEditors">
          <Editor
            code={maincode}
            handleCode={setEditorMain}
            isButtonDisabled={!isPyodideLoaded}
            handleButtonClick={handleMainClick}
            isReloadButtonDisabled={!isPyodideLoaded || loadingClearCode}
            handleReloadButton={() => handleReload("code")}
            buttonText={"Rodar Código"}
          />
          <Editor
            code={testcode}
            handleCode={setEditorTest}
            isButtonDisabled={!isPyodideLoaded}
            handleButtonClick={handleTestClick}
            isReloadButtonDisabled={!isPyodideLoaded || loadingClearCode}
            handleReloadButton={() => handleReload("test")}
            buttonText={"Rodar Teste"}
          />
        </div>
        <Popconfirm
          title="Tem certeza que quer finalizar o desafio?"
          open={openConfirm}
          onConfirm={handleSubmitChallenge}
          okButtonProps={{ loading: confirmLoading }}
          onCancel={() => setOpenConfirm(false)}
        >
          <Button
            type="primary"
            variant="success"
          >
            Finalizar
          </Button>
        </Popconfirm>
        {!isPyodideLoaded ? (
          <Spinner
            style={{ margin: "0 0 10px 0" }}
            animation="border"
            variant="info"
          />
        ) : (
          <div style={{ margin: "0 0 42px 0" }}></div>
        )}
        <PyComp
          code={code}
          handlePyodideLoad={handlePyodideLoad}
          output={output}
          setOutput={setOutput}
          isError={isError}
          setIsError={setIsError}
        />
      </div>
    </>
  );
}
