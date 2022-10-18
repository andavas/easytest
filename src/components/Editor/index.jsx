import React from "react";
import AceEditor from "react-ace";
import RunButton from "../RunButton";
import { Button } from 'react-bootstrap';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

import "./styles.css";

const Editor = (props) => {
  let fontSize = "11pt";

  return (
    <div className="editor">
      <AceEditor
        mode="python"
        theme="dracula"
        height="300px"
        width="600px"
        onChange={props.handleCode}
        value={props.code}
        name="codeEditor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          fontSize: fontSize,
        }}
      />
      <div className="buttonContainer">
      <RunButton
        text={props.buttonText}
        disabled={props.isButtonDisabled}
        handleClick={props.handleButtonClick}
      />
      <Button
        variant="primary"
        disabled={props.isReloadButtonDisabled}
        onClick={props.handleReloadButton}>
        Recarregar
      </Button>
      </div>
    </div>
  );
};

export default Editor;
