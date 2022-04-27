import {Form} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { DropdownButton } from 'react-bootstrap'
import { useCallback, useState } from 'react'
import "./createProgram.css"


const CreateProgramForm = () => {
  return (
    <Form className='programForm'>
        <div className="programForm-row">
            <Form.Group className="programForm-item" controlId="formBasicProgramName">
                <DropdownButton className='Button' id="dropdown-basic-button" variant="secondary" title="Select Sport"></DropdownButton>
            </Form.Group>
            {/* <Form.Group style={{display:"flex", flexDirection:"row"}} controlId="formBasicCoach">
                <DropdownButton className='Button' id="dropdown-basic-button" title="Select Coach"></DropdownButton>
            </Form.Group> */}
            <Form.Group className="programForm-item" controlId="formBasicLocation">
                <DropdownButton className='Button' id="dropdown-basic-button" variant="secondary" title="Select Location"></DropdownButton>
            </Form.Group>
            {/* <Form.Group style={{display:"flex", flexDirection:"row"}} controlId="formBasicAge">
                <DropdownButton className='Button' id="dropdown-basic-button" title="Select Age Range"></DropdownButton>
            </Form.Group> */}
        </div>
        <Form.Group className="programForm-item" controlId="formBasicProgramName">
            <Form.Label className="programForm-label">Program Name</Form.Label>
            <Form.Control className="programForm-input" type="input" placeholder="Enter Program Name" />
        </Form.Group>

        
        <div className="programForm-row">
            <Form.Group className="programForm-item" controlId="formBasicCapacity">
                <Form.Label className="programForm-label">Capacity</Form.Label>
                <Form.Control className="programForm-input" type="number" placeholder="Enter Maximum Class Size" />
            </Form.Group>
            <Form.Group className="programForm-item" controlId="formBasicWaitlistCapacity">
                <Form.Label className="programForm-label">Waitlist Capacity</Form.Label>
                <Form.Control className="programForm-input" type="number" placeholder="Enter Maximum Waitlist Capacity" />
            </Form.Group>
        </div>
        <div className="programForm-row">
            <Form.Group className="programForm-item" controlId="formBasicStartDates">
                <Form.Label className="programForm-label">Start Date</Form.Label>
                <Form.Control className="programForm-input" type="date" placeholder="2022-01-01" />
            </Form.Group>

            <Form.Group className="programForm-item" controlId="formBasicEndDates">
                <Form.Label className="programForm-label">End Dates</Form.Label>
                <Form.Control className="programForm-input" type="date" placeholder="2022-02-01" />
            </Form.Group>
        </div>
        <div className="programForm-row">
            <Form.Group className="programForm-item" controlId="formBasicStartTime">
                <Form.Label className="programForm-label">Start Time</Form.Label>
                <Form.Control className="programForm-input" type="time" placeholder="12:00PM" />
            </Form.Group>
            <Form.Group className="programForm-item" controlId="formBasicEndTime">
                <Form.Label className="programForm-label">End Time</Form.Label>
                <Form.Control className="programForm-input" type="time" placeholder="1:00PM" />
            </Form.Group>
        </div>
        <Button className="programForm-submit" variant="primary" type="submit">
            Submit
        </Button>
    </Form>
  )
}

export default CreateProgramForm