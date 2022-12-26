import React from 'react';
import './styles.css'

const PyComp = (props) => {
  const loadPyodide = async () => {
    const pyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
      });
    return await pyodide
  };
  
  const [pyodide, setPyodide]= React.useState();
  
  React.useEffect(async () => {
    try{
      const script = props.code; 
      if (!pyodide) { // primeira execução
        loadPyodide() // pyodide é carregado para o navegador do jogador
        .then((response) => {
          setPyodide(response)
          const out = response.runPython(script);  // execução do código python
          props.setOutput(out);
          props.handlePyodideLoad(true)
          props.setIsError(false)
        });
      }
      else { // depois da primeira execução o setPyodide já rodou
        const out = pyodide.runPython(script); // execução do código python
        props.setOutput(out); 
        props.setIsError(false)
      }
    } catch (pyError) {
      if (pyError.name === "PythonError") {
        props.setOutput(pyError.message);
        props.setIsError(true)
      } 
    } 
  }, [props.code]);


  return(<div id='pyodideOutputContainer' className={props.isError ? 'error' : ''}>
    {props.output}
  </div>);
}

export default PyComp;