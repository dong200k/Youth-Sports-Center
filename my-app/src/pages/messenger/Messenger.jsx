import React, { Component, useCallback, useEffect, useRef, useState } from 'react'
import Conversation from '../../component/conversation/Conversation'
import Message from '../../component/message/Message'
import { GetUserContext } from '../../context/UserContext.jsx'
import MessengerService from '../../services/messenger.service.js'
import './messenger.css'
import {io} from "socket.io-client"
import { v4 as uuidv4 } from "uuid"

export default function Messenger(){
  let connection
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    connection = "ws://localhost:5000"
  } else {
    // production code
    connection = "/"
  }
  let user = GetUserContext().user
  const [groups, setGroups] = useState([])
  const [currentGroup, setCurrentGroup] = useState(null)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const socket = useRef()
  const scrollRef = useRef()

  //connect to socket backend
  useEffect(()=>{
    if(!user._id)
      return
    socket.current = io(connection)

    console.log("add user")
    //add user to socket server
    let userInfo = {
      _id: user._id,
      name: user.first_name + " " + user.last_name
    }
    socket.current.emit("add user", userInfo)
    
    return ()=>socket.current.close()
  }, [user])

  // useEffect(()=>{
  //   GetUserContext().logout()
  // }, [])

  //listen for messages from socket server
  useEffect(()=>{
    if(!currentGroup)
      return
    socket.current.on("get message", (message)=>{
      if(currentGroup._id===message.group_id){
        message.date = new Date().getTime()
        setMessages(messages=>{
          return [...messages, message]
        })
      }
    })
  }, [currentGroup])

  const sendMessageToSocket = useCallback((message)=>{
    socket.current.emit("send message", {members: currentGroup.members, group: currentGroup._id, message: message.content})
  }, [currentGroup])

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

  //fetch messages from backend on click group
  useEffect(()=>{
    if(!currentGroup)
      return
    MessengerService.getMessages(currentGroup._id)
      .then(res=>{
        if(res.data.status==="success"){
          setMessages(res.data.messages)
          console.log(res.data)
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
          //update messages
          setMessages(message=>[...message, res.data.message])
          //set input text to empty string
          setMessage("")
          //send to socket
          sendMessageToSocket(res.data.message)
        }
      })
      .catch(err=>console.log(err))
  }

  //scroll to newest message
  useEffect(()=>{
    scrollRef?.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  return (  
    <div className="messenger-page">
    <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuInput">
            <i className="fa-solid fa-magnifying-glass" />
            <input placeholder="Search for Classes"/>
          </div>

          {groups.map(group=>
            <Conversation key={uuidv4()} group={group} current={group===currentGroup}
              onClick={()=>{
                setCurrentGroup(group)
              }}/>
            )}

        </div>
        <div className="chatBox">
          {currentGroup?
            <>
              <div className="chatBoxHeader">
                <div className="chatBoxHeader-title"> 
                  {currentGroup.name}
                </div>
                <div className="chatBoxHeader-btn">
                  <i className="fa-solid fa-list"></i>
                </div>
              </div>
              <div className="chatBoxTop">
                {messages.map(message=>
                  <div ref={scrollRef}>
                    <Message key={uuidv4()} own = {message.sender_id===user._id} message={message}/>
                  </div>
                )}
              </div>
              <div className="chatBoxBottom">
                <input className="chatMessageInput" onChange={handleChange} value={message} placeholder="write something..."></input>
                <button className="chatSubmitButton" onClick={sendMessage}>
                  <span>Send</span>
                  <i class="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </>
            :
            <div className="chatBox-shadow">
              Select A Conversation Group to Continue...
            </div>
          }
        </div>
          <div className='chatMenu'>
            <br/><br/><br/>
            {currentGroup?.memberNames.map(name=>
              <div className="conversation">
                <img src="data:image/jpeg;base64,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" alt="" className="conversationImg" />
                <span className="conversationName">{name}</span>
            </div>
            )}
          </div>
      </div>
    </div>
  )
}
