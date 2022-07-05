import React from 'react'
import script from './python/main.py';
import script2 from './python/main2.py';
import logo from './logo.svg';
import PyComp from './components/PyComp';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula"
import "ace-builds/src-noconflict/ext-language_tools"

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Button, Spinner } from 'react-bootstrap';

const App = () => {
  const [editorcode, setEditorCode] = React.useState(String.raw`def sum(a, b):
  return (a + b)

a, b = 5, 7
#a = int(input('Enter 1st number: '))
#c = int(input('Enter 2nd number: '))



def func(content):
  return content

func(f'Soma de {a} e {b} é {sum(a, b)}')`)

const [ testcode, setEditorTest ] = React.useState(String.raw`
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

`)

  const [code, setCode] = React.useState(editorcode);
  const [isPyodideLoading, setIsPyodideLoading] = React.useState(false)

  
  const handleReloadClick = async () => {
    // setReload(!reload)
    // reload ? setCode(script) : setCode(script2) 
    setCode(testcode)
  }

  const handleEditCode = (value) => {
    setEditorCode(value);
  }

  const handleEditTest = (value) => {
    setEditorTest(value);
  }

  const handlePyodideLoad = (value) => {
    setIsPyodideLoading(value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <AceEditor
          mode="python"
          theme="dracula"
          height='300px'
          onChange={handleEditCode}
          value={editorcode}
          name="codeEditor"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            fontSize: '12pt'
          }}
        />
        <AceEditor
          mode="python"
          theme="dracula"
          height='300px'
          onChange={handleEditTest}
          value={testcode}
          name="testEditor"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            fontSize: '12pt'
          }}
        />
        <PyComp code={code} handlePyodideLoad={handlePyodideLoad}/>
        {!isPyodideLoading ? <Spinner style={{margin: '0 0 10px 0'}} animation="border" variant="info" /> : <></>}
        <Button variant="primary" disabled={!isPyodideLoading} onClick={handleReloadClick}>Reload</Button>
      </header>
    </div>
  );
}

export default App;
