import React from 'react'
import { Card } from 'react-bootstrap'

export default function AnnouncementItem(props) {
  return (
    <Card className="Card">
    <Card.Header>{props.announcement.program_name}</Card.Header>
    <Card.Body>
        <Card.Title>{props.announcement.title}</Card.Title>
        <Card.Text>{props.announcement.message}</Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">From Coach {props.announcement.first_name}, {props.announcement.date.substring(0,10)}</Card.Footer>
    </Card>
  )
}
