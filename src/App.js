import React from "react";
import script from "./python/main.py";
import script2 from "./python/main2.py";
import logo from "./logo.svg";
import PyComp from "./components/PyComp";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Spinner } from "react-bootstrap";
import Editor from "./components/Editor";

const App = () => {
  const [maincode, setEditorMain] = React.useState(String.raw`def sum(a, b):
  return (a + b)

a, b = 5, 7
#a = int(input('Enter 1st number: '))
#c = int(input('Enter 2nd number: '))

def func(content):
  return content

func(f'Soma de {a} e {b} é {sum(a, b)}')




`);

  const [testcode, setEditorTest] = React.useState(String.raw`
def soma(a, b):
    return (a + b)

def func(content):
    return content

a, b = 5, 7
#a = int(input('Enter 1st number: '))
#c = int(input('Enter 2nd number: '))


import sys, io

import unittest
import __main__

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


suite = unittest.TestLoader().loadTestsFromModule(__main__)
old_stdout = sys.stdout
new_stdout = io.StringIO()
sys.stdout = new_stdout
unittest.TextTestRunner(stream=new_stdout).run(suite)
output = new_stdout.getvalue()
sys.stdout = old_stdout
func(f'{output}')

`);

  const [code, setCode] = React.useState(`
  def func(content):
    return content
  
  func(f'EasyTest!')
    `);
  const [isPyodideLoaded, setIsPyodideLoading] = React.useState(false);

  const handleMainClick = async () => {
    setCode(maincode);
  };
  const handleTestClick = async () => {
    setCode(testcode);
  };



  const handlePyodideLoad = (value) => {
    setIsPyodideLoading(value);
  };

  return (
    <div className="App">
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

export default App;
