import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './instructor_announcements.css'
import { useState } from 'react'
import Create_Announcement_Form from './create_announcement_form'

const Create_Button = () => {
    const[show, setShow] = useState(false)
  return (
    <div>
        <Button className="Button" variant="primary" onClick= {() => setShow(!show)}>Create Announcement</Button>{' '}
        {
            show? <Create_Announcement_Form/> : null
        }
    </div>
  )
}

export default Create_Button
