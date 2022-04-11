import React from "react";
import {Card} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import './instructor_announcements.css' 
import { useState } from "react";

const Instructor_Announcements = (props) => {
    const renderAnnouncement = (card, index) => {
        return (
            <Card className="Card" key={index} >
                <Card.Header>{card.programName}</Card.Header>
                <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.message}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">{card.date}</Card.Footer>
            </Card>
        );
    };

  return (
    <div className="AnnouncementBox">
        {props.announcementInfo.map(renderAnnouncement)}
    </div>
  );
}

export default Instructor_Announcements;