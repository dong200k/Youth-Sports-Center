import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useCallback, useEffect, useState } from 'react'
import AnnouncementForm from './AnnouncementForm'

const AnnouncementCreate = (props) => {
    const[show, setShow] = useState(false)
    const handleSubmit = useCallback(
      (announcement)=>{
        return async (e) => {
          e.preventDefault()
          props.onCreateAnnouncement(announcement)
            .then(res=>{
              if(res){
                setShow(prevShow=>!prevShow)
                // document.location.reload()
                console.log("res true")
              }
            })
        }
      }
      ,[props])
  return (
    <div className={show?"accouncementCreate annoucement-formshow":"accouncementCreate"}>
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
