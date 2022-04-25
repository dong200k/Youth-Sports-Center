import {Form} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { DropdownButton } from 'react-bootstrap'
import { useCallback, useState } from 'react'
import CreateProgramForm from './createProgramForm'
import "./createProgram.css"

const CreateProgram = () => {
    const[show, setShow] = useState(false);

  return (
      <div className={show?"createProgram formshow":"createProgram"}>
        <Button className="createProgram-btn" onClick= {() => setShow(!show)}>
        {!show&&<i className="fa-solid fa-angle-down"></i>}
        {show&&<i className="fa-solid fa-angle-up"></i>}
        <span>Create New Program</span>
      </Button>
      {
        show? <CreateProgramForm/> : null
      }
     </div>
  )
}

export default CreateProgram