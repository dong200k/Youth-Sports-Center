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
        <Alert style={{zIndex:2, height:'80px',width:'100%'}} variant="danger" onClose={onClose} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            {props.error.message}
          </p>
        </Alert>
      );
    }
    return null;
  }

