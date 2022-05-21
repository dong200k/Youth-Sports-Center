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

  const [programs, setPrograms] = useState([])
  const [currentProgram, setCurrentProgram] = useState(null)

  const [members, setMembers] = useState([])
  const [currentMember, setCurrentMember] = useState(null)

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

  // //

  // //listen for messages from socket server
  // useEffect(()=>{
  //   if(!currentMember)
  //     return
  //     socket.current.on("get message", (message)=>{
  //       if(currentGroup._id===message.group_id){
  //         message.date = new Date().getTime()
  //         setMessages(messages=>{
  //           return [...messages, message]
  //         })
  //       }
  //     })
  // }, [currentMember])

  const sendMessageToSocket = useCallback((message)=>{
    socket.current.emit("send message", {members: currentMember.group.members, group: currentMember.group._id, message: message.content})
  }, [currentMember])

  //fetch groups from backend after load
  useEffect(()=>{
    MessengerService.getClasses(user._id)
      .then(res=>{
        if(res.data.status==="success"){
          console.log(res.data)
          setPrograms(res.data.classes)
        }
      })
      .catch(err=>console.log(err))
  }, [])


  //fetch messages from backend on click group
  useEffect(()=>{
    if(!currentMember)
      return
    MessengerService.getMessages(currentMember.group._id)
      .then(res=>{
        if(res.data.status==="success"){
          setMessages(res.data.messages)
          console.log(res.data)
        }
      })
      .catch(err=>console.log(err))
  }, [currentMember])

  //handle input change
  const handleChange = (e)=>{
    setMessage(e.target.value)
  }
  //send messages to backend
  const sendMessage = ()=>{
    if(!currentMember)
      return
    let data = {
      sender_id: user._id,
      group_id: currentMember.group._id,
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

  const handleSelectProgram = (program) => {
    setCurrentProgram(program)
    let members = program.users
    setMembers(members)
    setCurrentMember(null)
  }
  return (  
    <div className="messenger-page">
    <div className="messenger">
      <div className="messenger-programs">
        {/* {programs.map(program=>
          <Conversation key={uuidv4()} program={program} current={program===currentProgram}
            onClick={()=>{
              setCurrentProgram(group)
            }}/>
          )} */}
          {programs.map(program=>
            <div className={program==currentProgram?"messenger-programs-item program-select":"messenger-programs-item"} onClick={()=>handleSelectProgram(program)} key={uuidv4()}>
              {program.name}
            </div>
          )}
      </div>
      {currentProgram && 
      <div className="messenger-targets"> 
        {members.map(member=>
          <div className={member==currentMember?"messenger-targets-item target-select":"messenger-targets-item"} onClick={()=>setCurrentMember(member)} key={uuidv4()}>
            {member.first_name} {member.last_name}
          </div>
        )}
      </div>

      }
      {currentMember &&
        <div className="chatBox">   
              <div className="chatBoxHeader">
                <p> 
                  {currentMember.first_name} {currentMember.last_name} ({currentProgram.name})
                </p>
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
                <button className="chatSubmitButton" 
                onClick={sendMessage}
                >
                  <span>Send</span>
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
        </div>
      }
      </div>
    </div>
  )
}
