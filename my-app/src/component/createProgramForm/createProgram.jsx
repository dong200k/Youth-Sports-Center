import {Form} from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const CreateProgram = () => {
  return (
    <Form className='FormContainer'>
        <Form.Group className="mb-3" controlId="formBasicProgramName">
            <Form.Label>Program Name</Form.Label>
            <Form.Control type="Program Name" placeholder="Enter Program Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCoach">
            <Form.Label>Coach</Form.Label>
            <Form.Control type="Coach" placeholder="Enter Coach Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control type="Location" placeholder="123 Sesame Street" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAge">
            <Form.Label>Age</Form.Label>
            <Form.Control type="Age" placeholder="10 11 12" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDates">
            <Form.Label>Start and End Dates</Form.Label>
            <Form.Control type="Age" placeholder="2022-01-01 ~ 2022-02-01" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSchedule">
            <Form.Label>Schedule</Form.Label>
            <Form.Control type="Schedule" placeholder="Mo Tu : 01:00 ~ 02:00" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
  )
}

export default CreateProgram