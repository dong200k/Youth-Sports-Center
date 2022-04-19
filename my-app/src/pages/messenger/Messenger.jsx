import React, { Component, useEffect, useState } from 'react'
import Conversation from '../../component/conversation/Conversation'
import Message from '../../component/message/Message'
import { GetUserContext } from '../../context/UserContext.jsx'
import MessengerService from '../../services/messenger.service.js'
import './messenger.css'

export default function Messenger(){
  
  let user = GetUserContext().user

  const [groups, setGroups] = useState([])
  const [currentGroup, setCurrentGroup] = useState(null)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")

  //fetch groups from backend after load
  useEffect(()=>{
    MessengerService.getGroup(user._id)
      .then(res=>{
        if(res.data.status==="success"){
          setGroups(res.data.groups)
        }
      })
      .catch(err=>console.log(err))
  }, [])

  //fetch messages form backend on click group
  useEffect(()=>{
    if(!currentGroup)
      return
    MessengerService.getMessages(currentGroup._id)
      .then(res=>{
        if(res.data.status==="success"){
          setMessages(res.data.messages)
        }
      })
      .catch(err=>console.log(err))
  }, [currentGroup])

  //handle input change
  const handleChange = (e)=>{
    setMessage(e.target.value)
  }
  //send messages to backend
  const sendMessage = ()=>{
    if(!currentGroup)
      return
    let data = {
      sender_id: user._id,
      group_id: currentGroup._id,
      content: message
    }
    MessengerService.sendMessage(data)
      .then(res=>{
        if(res.data.status==="success"){
          setMessages(message=>[...message, res.data.message])
        }
      })
      .catch(err=>console.log(err))
  }

  return (  
    <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
              <input placeholder="Search for Classes" className="chatMenuInput" />
              {groups.map(group=>
                <Conversation key={group._id} group={group}
                  onClick={()=>{
                    setCurrentGroup(group)
                  }}/>
                )}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
              {currentGroup?
                <div className="chatBoxTop">
                    {messages.map(message=>
                      <Message key={message._id} own = {message.sender_id===user._id} message={message}/>
                    )}
                    
                </div>
                :
                <h1>Please Select a Group Chat</h1>
              }
              <div className="chatBoxBottom">
                  <textarea className="chatMessageInput" onChange={handleChange} value={message} placeholder="write something..."></textarea>
                  <button className="chatSubmitButton" onClick={sendMessage}>Send</button>
              </div>
          </div>
        </div>
    </div>
  )
}
