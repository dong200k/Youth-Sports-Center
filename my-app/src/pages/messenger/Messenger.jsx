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
  let user_id = user._id

  const [programs, setPrograms] = useState([])
  const [currentProgram, setCurrentProgram] = useState(null)

  const [members, setMembers] = useState([])
  const [currentMember, setCurrentMember] = useState(null)

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")

  const[messageFromSocket, setmessageFromSocket] = useState({})

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

  //fetch groups from backend after load
  useEffect(()=>{
    MessengerService.getClasses(user._id)
      .then(res=>{
        if(res.data.status==="success"){
          let programs = res.data.classes
          // programs = programs.filter(program => program.users.filter(member=> member.user_type != user.user_type).length != 0)
          programs = updateNewMessageStatus(programs)
          console.log("get class from backend")
          console.log(programs)
          setPrograms(programs)
        }
      })
      .catch(err=>console.log(err))
  }, [])

  // useEffect(()=>{
  //   GetUserContext().logout()
  // }, [])

  // //

  const sendMessageToSocket = useCallback((message)=>{
    socket.current.emit("send message", {members: currentMember.group.members, group: currentMember.group._id, message: message.content})
  }, [currentMember])

  //check if group has new message from this user's viewpoint
  const updateUserNewMessageStatus = (user)=>{
    let hasNewMessage = false
    let statuses = user.group.readStatus

    //find last time current user opened the group chat
    let lastOpened = new Date(statuses.find(status=>status.user_id.toString()===user_id).lastOpened).getTime()

    for(const status of statuses){
      //skip status for current user
      if(status.user_id===user._id)
        continue
      const lastModified = new Date(status.lastModified).getTime()
      
      //there was message after user last opened
      if(lastOpened<lastModified){
        hasNewMessage = true
        break
      }
    }
    user.hasNewMessage = hasNewMessage
    return user
  }

  //check if program has a group with unread message
  const updateProgramNewMessageStatus = (program)=>{
    let hasNewMessage = false
    program.users = program.users.map(user=>{
      let newUser = updateUserNewMessageStatus(user)
      if(newUser.hasNewMessage)
        hasNewMessage = true
      return newUser
    })
    program.hasNewMessage = hasNewMessage
    return program
  }

  //return programs with updated status for each program and each group of each program
  const updateNewMessageStatus = (programs)=>{
    return programs.map(program=>updateProgramNewMessageStatus(program))
  }

  //update classes with new status, called after new socket message or when user open new group
  const updateClassStatus = (group_id, sender_id, type)=>{
    let newPrograms = [...programs]
    if(group_id && sender_id)
      for(const program of newPrograms)
        for(const user of program.users)
          if(user.group._id===group_id){
            let readStatus = user.group.readStatus
            let senderStatus = readStatus.find(status=>status.user_id===sender_id)
            if(type==="lastModified")
              senderStatus.lastModified = new Date(Date.now())
            else if(type==="lastOpened")
              senderStatus.lastOpened = new Date(Date.now())
          }
    console.log("updateClassstatus")
    console.log(newPrograms)
    setPrograms(updateNewMessageStatus(newPrograms))
  }

  // //listen for messages from socket server
  useEffect(()=>{
    socket.current.on("get message", (message)=>{
      //if open a chat and message for the open chat then update messages
      if(currentMember && currentMember.group._id===message.group_id){
        message.date = new Date().getTime()
        setmessageFromSocket(message)
        // setMessages(messages=>{
        //   return [...messages, message]
        // })
      }
    })
  }, [currentMember])

  //if message from socket update
  useEffect(()=>{
    if(!messageFromSocket.content)
      return
    setMessages(messages=>{
      return [...messages, messageFromSocket]
    })
    
    //update hasNewMessage
    updateClassStatus(messageFromSocket.group_id, messageFromSocket.sender_id, "lastModified")

    if(currentMember.group._id===messageFromSocket.group_id){
      setTimeout(function () {
        console.log("5 seconds passed since opening chat, updating class again")
        updateClassStatus(messageFromSocket._id, user._id, "lastOpened")
      }, 5000);
    }

  }, [messageFromSocket])

  //update last opened when currentMember change
  useEffect(()=>{
    if(!currentMember||!currentMember.group)
      return
    const group = currentMember.group
    const status = group.readStatus.find(status=>status.user_id===user._id)

    const newStatus = {
      lastOpened: new Date(Date.now()),
      lastModified: status.lastModified,
      user_id: user._id
    }
    const data = {  
      user_id: user._id,
      group_id: group._id,
      readStatus: newStatus
    }

    MessengerService.updateStatus(data)
      .then(res=>{
        if(res.data.status==="success")
          console.log("successfully updated open status")
          setTimeout(function () {
            console.log("5 seconds passed since opening chat, updating class again")
            updateClassStatus(group._id, user._id, "lastOpened")
          }, 5000);
      })
      .catch(e=>console.log(e.message))

  }, [currentMember, user._id])

  //fetch messages from backend on click group
  useEffect(()=>{
    if(!currentMember)
      return
    MessengerService.getMessages(currentMember.group._id)
      .then(res=>{
        if(res.data.status==="success"){
          setMessages(res.data.messages)
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
    if(!currentMember || !message || message==="")
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
    if(user.user_type == "Parent"){
      members = members.filter(member=>(member.user_type!=user.user_type))
    }
    setMembers(members)
    setCurrentMember(null)
  }

  //when program change load print
  useEffect(()=>{
    console.log(programs)
  }, [programs])

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
                  {currentMember.first_name} {currentMember.last_name} ({currentMember.user_type})
                </p>
              </div>
              <div className="chatBoxTop">
                {messages.map(message=>
                  <div ref={scrollRef} key={uuidv4()}>
                    <Message own = {message.sender_id===user._id} message={message}/>
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
