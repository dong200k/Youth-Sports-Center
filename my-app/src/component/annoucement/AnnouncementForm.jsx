import React, { useEffect, useState } from 'react'
import {Form} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import {Dropdown} from "react-bootstrap"
import {DropdownButton} from "react-bootstrap"
import { GetUserContext } from '../../context/UserContext.jsx'
import programService from '../../services/program.service.js'
import MyAlert from '../myAlert/MyAlert.jsx'

const AnnouncementForm = (props) => {
    const [programNames, setProgramNames] = useState([])
    const user = GetUserContext().user
    const [error, setError] = useState('')

    //grab all programs names instructor teach
    useEffect(()=>{
      if(user.user_type!=="Instructor")
        return
      programService.getUserProgram(user._id)
        .then(res=>{
          if(res.data.status==="success"){
            setProgramNames(res.data.programs)
          }
        })
        .catch((e)=>console.log(e))
    }, [user])
    const [announcement, setAnnouncement] = useState({
        title: "",
        message:"",
        program_id:"",
        program_name: ""
    })
    function handleChange(input, program){
        return (e)=>{
            e.preventDefault()
            try {
                setAnnouncement(old=>{
                    let newAnnouncement = {
                        title: old.title,
                        message: old.message,
                        program_id: old.program_id,
                        program_name: old.program_name
                    }
                    if(input==="program_name"){
                        newAnnouncement.program_name = program.program_name
                        newAnnouncement.program_id = program._id
                        console.log(newAnnouncement)
                    }
                    else
                        newAnnouncement[input] = e.target.value
                    return newAnnouncement
                })  
            } catch (error) {
                setError(error)
            }

        }
    }

  return (
    <Form className="announcementForm" onSubmit={props.onCreateAnnouncement(announcement)}>
        {error != '' && <MyAlert error={error} clear={()=>setError('')}/>}
        <Form.Group className="" controlId="formBasicProgram">
                <DropdownButton className="announcementForm-Button"  
                            title={announcement.program_name===""?"Select Program":announcement.program_name}>
                    {programNames.map((program,index)=>
                        <Dropdown.Item key={index}
                                onClick={handleChange("program_name", program)}>{program.program_name}
                        </Dropdown.Item>)}
                </DropdownButton>

            {/* <Form.Label>Program Name</Form.Label>
            <Form.Control type="programName" placeholder='Program Name'></Form.Control> */}

        </Form.Group>
        <Form.Group className="announcementForm-input" controlId="formBasicTitle">
            <Form.Control type="title" placeholder="Enter title" value={announcement.title} onChange={handleChange("title")}/>
        </Form.Group>

        <Form.Group className="announcementForm-input" controlId="formBasicMessage">
            <Form.Control as="textarea" rows={5} placeholder="Enter Message" value={announcement.message} onChange={handleChange("message")}/>
        </Form.Group>
        <Button className="announcementForm-submit" variant="primary" type="submit">Submit</Button>
    </Form>
  )
}

export default AnnouncementForm