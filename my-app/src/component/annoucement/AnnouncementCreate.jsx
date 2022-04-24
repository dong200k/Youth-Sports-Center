import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useCallback, useEffect, useState } from 'react'
import AnnouncementForm from './AnnouncementForm'

const AnnouncementCreate = (props) => {
    const[show, setShow] = useState(false)
    const handleSubmit = useCallback(
      (announcement)=>{
        return (e) => {
          e.preventDefault()
          props.onCreateAnnouncement(announcement)
          setShow(prevShow=>!prevShow)
        }
      }
      ,[props])
  return (
    <div className={show?"accouncementCreate formshow":"accouncementCreate"}>
      <button className="accouncementCreate-btn" onClick= {() => setShow(!show)}>
        {!show&&<i className="fa-solid fa-angle-down"></i>}
        {show&&<i className="fa-solid fa-angle-up"></i>}
        <span>Create Annoucement</span>
          {/* <Button className="Button" variant="primary" onClick= {() => setShow(!show)}>Create Announcement</Button>{' '}
          {
              show? <AnnouncementForm programNames={props.programNames} onCreateAnnouncement={handleSubmit}/> : null
          } */}
      </button>
      {
        show? <AnnouncementForm onCreateAnnouncement={handleSubmit}/> : null
      }
    </div>

  )
}

export default AnnouncementCreate
