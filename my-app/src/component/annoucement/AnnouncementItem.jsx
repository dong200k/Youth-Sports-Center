import React from 'react'
import { Card } from 'react-bootstrap'

export default function AnnouncementItem(props) {
  return (
    // <Card className="annoucementItem">
    // <Card.Header>{props.announcement.program_name}</Card.Header>
    // <Card.Body>
    //     <Card.Title>{props.announcement.title}</Card.Title>
    //     <Card.Text>{props.announcement.message}</Card.Text>
    // </Card.Body>
    // <Card.Footer className="text-muted">From Coach {props.announcement.first_name}, {props.announcement.date.substring(0,10)}</Card.Footer>
    // </Card>
    <div className="announcementItem">
        <div className="announcementItem-header">
            <span> {props.announcement.program_name} </span>
            <span> {props.announcement.date.substring(0,10)} </span>
        </div>
        <div className="announcementItem-content">
            <div className="announcementItem-title">
                {props.announcement.title}
            </div>
            <div className="announcementItem-content">
                {props.announcement.message}
            </div>
        </div>
    </div>
  )
}
