import React from "react";
import PyComp from "../../components/PyComp";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Desafio.css";

import { Spinner } from "react-bootstrap";
import Editor from "../../components/Editor";

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

export default function Desafio(props)  {

console.log(props)

  const [maincode, setEditorMain] = React.useState(`
def soma(a, b):
  return (a + b)

a, b = 5, 7
#a = int(input('Enter 1st number: '))
#c = int(input('Enter 2nd number: '))

print(f'Soma de {a} e {b} é {soma(a, b)}')

`);

  const [testcode, setEditorTest] = React.useState(`
class TestSum(unittest.TestCase):
    def test_list_int(self):
        """
        Testa se consegue somar dois números positivos
        """
        a, b = 2, 5
        result = soma(a,b)
        self.assertEqual(result, 7)

    def test_list_neg_int(self):
        """
        Testa se consegue somar dois números negativos
        """
        a,b = -2, -8
        result = soma(a,b)
        self.assertEqual(result, -10)

    def test_bad_type(self):
        a,b = 'banana', 3
        with self.assertRaises(TypeError):
            result = soma(a,b)

`);

  const [code, setCode] = React.useState(`
  def func(content):
    return content
  
  func(f'EasyTest!')
    `);
  const [isPyodideLoaded, setIsPyodideLoading] = React.useState(false);

  const handleMainClick = async () => {
    setCode(codePreamble+maincode);
  };
  const handleTestClick = async () => {
    setCode(codePreamble+maincode+testcode+codeEpilogue);
  };

  const handlePyodideLoad = (value) => {
    setIsPyodideLoading(value);
  };

  return (
    <div className="desafio">
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
