import React, { useEffect, useState } from 'react'
import {Form} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import {Dropdown} from "react-bootstrap"
import {DropdownButton} from "react-bootstrap"

const AnnouncementForm = (props) => {
    const something = (e) => {
        e.preventDefault()
    }
    const [announcement, setAnnouncement] = useState({
        title: "",
        message:"",
        program_id:"",
        program_name: ""
    })
    function handleChange(input, program){
        return (e)=>{
            e.preventDefault()
            setAnnouncement(old=>{
                let newAnnouncement = {
                    title: old.title,
                    message: old.message,
                    program_id: old.program_id,
                    program_name: old.program_name
                }
                if(input==="program_name"){
                    newAnnouncement.program_name = program.program_name
                    newAnnouncement.program_id = program.program_id
                }
                else
                    newAnnouncement[input] = e.target.value
                return newAnnouncement
            })
        }
    }
    
  return (
    <div className='FormBox'>
        <Form className="AnnouncementForm" onSubmit={props.onCreateAnnouncement(announcement)}>
            <Form.Group className="mb-3" controlId="formBasicProgram">
                {/* <Form.Label>Program Name</Form.Label>
                <Form.Control type="programName" placeholder='Program Name'></Form.Control> */}
                 <DropdownButton className= "Button" 
                                id="dropdown-basic-button" 
                                title={announcement.program_name===""?"Select Program":announcement.program_name}>
                    {props.programNames.map((program,index)=>
                        <Dropdown.Item key={index}
                                onClick={handleChange("program_name", program)}>{program.program_name}</Dropdown.Item>)}
                </DropdownButton>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="title" placeholder="Enter title" value={announcement.title} onChange={handleChange("title")}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter Message" value={announcement.message} onChange={handleChange("message")}/>
            </Form.Group>
            <Button className="Button" variant="primary" type="submit">Submit</Button>
        </Form>
    </div>
  )
}

export default AnnouncementForm