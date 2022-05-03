import React, { Component, useCallback, useEffect, useRef, useState } from 'react'
import Conversation from '../../component/conversation/Conversation'
import Message from '../../component/message/Message'
import { GetUserContext } from '../../context/UserContext.jsx'
import MessengerService from '../../services/messenger.service.js'
import './messenger.css'
import {io} from "socket.io-client"
import { v4 as uuidv4 } from "uuid"

export default function Messenger(){
  
  const connection = "ws://localhost:8900"
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
    socket.current.emit("add user", user._id)
    
    return ()=>socket.current.close()
  }, [user._id])

  // useEffect(()=>{
  //   GetUserContext().logout()
  // }, [])

  //listen for messages from socket server
  useEffect(()=>{
    console.log(currentGroup)
    if(!currentGroup)
      return
    socket.current.on("get message", (message)=>{
      console.log("received message")
      console.log(message)
      if(currentGroup._id===message.group_id){
        message.date = new Date().getTime()
        setMessages(messages=>{
          console.log(messages)
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
      </div>
    </div>
  )
}
