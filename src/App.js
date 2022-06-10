import React from 'react'
import script from './python/main.py';
import script2 from './python/main2.py';
import logo from './logo.svg';
import './App.css';
import PyComp from './components/PyComp';
import react from 'react';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula"
import "ace-builds/src-noconflict/ext-language_tools"

const App = () => {
  const [code, setCode] = React.useState(script);
  const [editorcode, setEditorCode] = React.useState(String.raw`def sum(a, b):
  return (a + b)

a, b = 5, 7
#a = int(input('Enter 1st number: '))
#c = int(input('Enter 2nd number: '))



def func(content):
  return content

func(f'Soma de {a} e {b} é {sum(a, b)}')`)
  const [reload, setReload] = React.useState(false);

  const handleReloadClick = () => {
    // setReload(!reload)
    // reload ? setCode(script) : setCode(script2) 
    setCode(editorcode)
  }

  const handleEditCode = (value) => {
    setEditorCode(value);
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AceEditor
          mode="python"
          theme="dracula"
          onChange={handleEditCode}
          value={editorcode}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
        />
        <PyComp code={code} />
        <button onClick={handleReloadClick}>Reload</button>
      </header>
    </div>
  );
}

export default App;
