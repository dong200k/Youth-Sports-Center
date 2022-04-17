import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useCallback, useState } from 'react'
import AnnouncementForm from './AnnouncementForm'

const AnnouncementCreate = (props) => {
    const[show, setShow] = useState(false)
    const handleSubmit = useCallback(
      (announcement)=>{
        return (e) => {
          console.log("cretebutton handle submit")
          e.preventDefault()
          props.onCreateAnnouncement(announcement)
          setShow(prevShow=>!prevShow)
        }
      }
      ,[props])
  return (
    <div>
        <Button className="Button" variant="primary" onClick= {() => setShow(!show)}>Create Announcement</Button>{' '}
        {
            show? <AnnouncementForm programNames={props.programNames} onCreateAnnouncement={handleSubmit}/> : null
        }
    </div>
  )
}

export default AnnouncementCreate
