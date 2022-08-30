import React from 'react';

import './styles.css'

const PyComp = (props) => {
  const loadPyodide = async () => {
    const pyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
      });
    return await pyodide
  };
  
  const [output, setOutput] = React.useState("Carregando Pyodide...");
  const [pyodide, setPyodide]= React.useState();
  
  React.useEffect(async () => {
      const script = props.code; 
      if (!pyodide) {
        loadPyodide()
        .then((response) => {
          setPyodide(response)
          const out = response.runPython(script);
          setOutput(out);
          props.handlePyodideLoad(true)
        });
      }
      else { // depois da primeira execução o setPyodide já rodou
        const out = pyodide.runPython(script);
        setOutput(out);
        console.log(script)
      }
  }, [props.code]);


  return(<div id='pyodideOutputContainer'>
    {output}
  </div>);
}

export default PyComp;