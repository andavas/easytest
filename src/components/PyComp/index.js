import React from 'react';

const PyComp = (props) => {
  const loadPyodide = async () => {
    const pyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
      });
    return await pyodide
  };
  
  const [output, setOutput] = React.useState("(loading...)");
  const [pyodide, setPyodide]= React.useState();
  
  React.useEffect(async () => {
      const script = await (await fetch(props.code)).text();
      if (!pyodide) {
        loadPyodide()
        .then((response) => {
          setPyodide(response)
          const out = response.runPython(script);
          setOutput(out);
        });
      }
      else { // depois da primeira execução o setPyodide já rodou
        const out = pyodide.runPython(script);
        setOutput(out);
      }
  }, [props.code]);

  return <p>{output}</p>;
}

export default PyComp;