import {Form} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { DropdownButton } from 'react-bootstrap'
import { useCallback, useState } from 'react'
import "./createProgram.css"


const CreateProgramForm = () => {
  return (
    <Form className='FormContainer'>
            <Form.Group className="mb-3" controlId="formBasicProgramName">
                <Form.Label>Program Name</Form.Label>
                <Form.Control type="Program Name" placeholder="Enter Program Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicProgramName">
                <DropdownButton className='Button' id="dropdown-basic-button" title="Select Sport"></DropdownButton>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCoach">
                <DropdownButton className='Button' id="dropdown-basic-button" title="Select Coach"></DropdownButton>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLocation">
                <DropdownButton className='Button' id="dropdown-basic-button" title="Select Location"></DropdownButton>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAge">
                <DropdownButton className='Button' id="dropdown-basic-button" title="Select Age Range"></DropdownButton>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCapacity">
                <Form.Label>Capacity</Form.Label>
                <Form.Control type="Capacity" placeholder="Enter Maximum Class Size" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicWaitlistCapacity">
                <Form.Label>Waitlist Capacity</Form.Label>
                <Form.Control type="WaitlistCapacity" placeholder="Enter Maximum Waitlist Capacity" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDates">
                <Form.Label>Start and End Dates</Form.Label>
                <Form.Control type="Age" placeholder="2022-01-01 ~ 2022-02-01" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicStartTime">
                <Form.Label>Start Time</Form.Label>
                <Form.Control type="StartTime" placeholder="12:00PM" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEndTime">
                <Form.Label>End Time</Form.Label>
                <Form.Control type="StartTime" placeholder="1:00PM" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
  )
}

export default CreateProgramForm