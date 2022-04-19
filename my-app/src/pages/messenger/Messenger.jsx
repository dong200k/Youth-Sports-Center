import React, { Component, useEffect, useState } from 'react'
import Conversation from '../../component/conversation/Conversation'
import Message from '../../component/message/Message'
import MessengerService from '../../services/messenger.service.js'
import './messenger.css'

export default function Messenger(){


  const [groups, setGroups] = useState([])

  //fetch groups from backend after load
  useEffect(()=>{
    MessengerService.getGroup()
    
  }, [])

  return (  
    <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
              <input placeholder="Search for Classes" className="chatMenuInput" />
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
              <div className="chatBoxTop">
                  <Message own = {true}/>
                  <Message />
                  <Message own = {true}/>
                  <Message />
                  <Message />
                  <Message />
                  <Message />
                  <Message /><Message />
                  <Message />
                  <Message />
                  <Message />
                  <Message />
              </div>
              <div className="chatBoxBottom">
                  <textarea className="chatMessageInput" placeholder="write something..."></textarea>
                  <button className="chatSubmitButton">Send</button>
              </div>
          </div>
        </div>
    </div>
  )
}
