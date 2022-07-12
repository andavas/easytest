import React from 'react';
import { Button } from 'react-bootstrap';

const RunButton = (props) => {
    return ( 
    <Button style={{margin: '10px 0'}}
        variant="primary"
        disabled={props.disabled}
        onClick={props.handleClick}
      >
        {props.text}
    </Button> 
    );
}
 
export default RunButton;