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
  const [code, setCode] = React.useState(editorcode);
  const [isPyodideLoading, setIsPyodideLoading] = React.useState(false)

  
  const handleReloadClick = async () => {
    // setReload(!reload)
    // reload ? setCode(script) : setCode(script2) 
    setCode(editorcode)
   
  }

  const handleEditCode = (value) => {
    setEditorCode(value);
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
          name="UNIQUE_ID_OF_DIV"
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
