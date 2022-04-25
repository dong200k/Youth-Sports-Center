import {Form} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { DropdownButton } from 'react-bootstrap'
import { useCallback, useState } from 'react'
import "./createProgram.css"


const CreateProgramForm = () => {
  return (
    <Form className='FormContainer'>
            <Form.Group style={{display:"flex", flexDirection:"row"}} controlId="formBasicProgramName">
                <Form.Label className="createProgram-label">Program Name</Form.Label>
                <Form.Control type="Program Name" placeholder="Enter Program Name" />
            </Form.Group>
            <Form.Group style={{display:"flex", flexDirection:"row"}} controlId="formBasicProgramName">
                <DropdownButton className='Button' id="dropdown-basic-button" title="Select Sport"></DropdownButton>
            </Form.Group>
            <Form.Group style={{display:"flex", flexDirection:"row"}} controlId="formBasicCoach">
                <DropdownButton className='Button' id="dropdown-basic-button" title="Select Coach"></DropdownButton>
            </Form.Group>
            <Form.Group style={{display:"flex", flexDirection:"row"}} controlId="formBasicLocation">
                <DropdownButton className='Button' id="dropdown-basic-button" title="Select Location"></DropdownButton>
            </Form.Group>
            <Form.Group style={{display:"flex", flexDirection:"row"}} controlId="formBasicAge">
                <DropdownButton className='Button' id="dropdown-basic-button" title="Select Age Range"></DropdownButton>
            </Form.Group>
            <Form.Group style={{display:"flex", flexDirection:"row"}} controlId="formBasicCapacity">
                <Form.Label className="createProgram-label">Capacity</Form.Label>
                <Form.Control type="Capacity" placeholder="Enter Maximum Class Size" />
            </Form.Group>
            <Form.Group style={{display:"flex", flexDirection:"row"}} controlId="formBasicWaitlistCapacity">
                <Form.Label className="createProgram-label">Waitlist Capacity</Form.Label>
                <Form.Control type="WaitlistCapacity" placeholder="Enter Maximum Waitlist Capacity" />
            </Form.Group>
            <Form.Group style={{display:"flex", flexDirection:"row"}} controlId="formBasicDates">
                <Form.Label className="createProgram-label">Start and End Dates</Form.Label>
                <Form.Control type="Age" placeholder="2022-01-01 ~ 2022-02-01" />
            </Form.Group>
            <Form.Group style={{display:"flex", flexDirection:"row"}} controlId="formBasicStartTime">
                <Form.Label className="createProgram-label">Start Time</Form.Label>
                <Form.Control type="StartTime" placeholder="12:00PM" />
            </Form.Group>
            <Form.Group style={{display:"flex", flexDirection:"row"}} controlId="formBasicEndTime">
                <Form.Label className="createProgram-label">End Time</Form.Label>
                <Form.Control type="StartTime" placeholder="1:00PM" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
  )
}

export default CreateProgramForm