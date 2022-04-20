import React from "react";
import {Card} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from "react";
import AnnouncementItem from "./AnnouncementItem";

const AnnouncementList = (props) => {
    const renderAnnouncement = (announcement, index) => {
        return (
            <AnnouncementItem announcement={announcement} key={index}/>
        );
    };

  return (
    <div className="announcementList">
        {props.announcementInfo.map(renderAnnouncement)}
    </div>
  );
}

export default AnnouncementList;