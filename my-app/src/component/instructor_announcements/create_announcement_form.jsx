import React from 'react'
import {Form} from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const Create_Announcement_Form = (props) => {
    const something = (e) => {
        e.preventDefault()
        console.log(props)
    }
  return (
    <div className='FormBox'>
        <Form className="AnnouncementForm" onSubmit={props.onCreateAnnouncement}>
            <Form.Group className="mb-3" controlId="formBasicProgram">
                <Form.Label>Program Name</Form.Label>
                <Form.Control type="programName" placeholder='Program Name'></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="title" placeholder="Enter title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter Message" />
            </Form.Group>
            <Button className="Button" variant="primary" type="submit">Submit</Button>
        </Form>
    </div>
  )
}

export default Create_Announcement_Form