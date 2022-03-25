import React from "react";
import {Card} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import './announcements.css' 
import { useState } from "react";

const Announcements = () => {
    const [announcementInfo, setAnnouncementInfo] = useState([
        {
            id: "1", 
            programId: "1", 
            programName: "Soccer 5U",
            title: "Welcome", 
            message: "Hi, Thank you for joining this class", 
            senderId: "1", 
            date: "3/20/22"
        },
        {
            id: "2", 
            programId: "1", 
            programName: "Soccer 5U",
            title: "Class Cancelled", 
            message: "The first session of this class is cancelled", 
            senderId: "1", 
            date: "3/20/22"
        },
        {
            id: "3", 
            programId: "2", 
            programName: "Basketball 5U",
            title: "Welcome to Basketball 5U", 
            message: "Thank you for enrolling in the basketball program", 
            senderId: "4", 
            date: "3/20/22"
        },
    ]);

    const renderAnnouncement = (card, index) => {
        return (
            <Card className="Card" key={index}  >
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
        {announcementInfo.map(renderAnnouncement)}
    </div>
  );
}

export default Announcements;