import { useContext, useEffect, useState } from "react"
import { useCallback } from "react";
import { Alert, Button } from "react-bootstrap";


export default function MyAlert(props) {
    const [show, setShow] = useState(true);
  
    const onClose = () => {
      setShow(false)
      props.clear()
    }
    if (show) {
      return (
        <Alert style={{zIndex:2,height: '100px',width:'100%'}} variant="danger" onClose={onClose} dismissible>
          <Alert.Heading style={{margin:0}}>Oh snap! You got an error!
          <p style={{margin:0}}>
            {props.error.message}
          </p>
          </Alert.Heading>
        </Alert>
      );
    }
    return null;
  }

