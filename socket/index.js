import { Server } from "socket.io";
export default function initIO(server){
    // const io = require("socket.io")(server);
        // {
        //     cors:{
        //         origin:"http://localhost:3000"
        //     }
        // }
    // );
    const io = new Server(server,{
        cors:{
            origin:"http://localhost:3000"
        }
    })

    //key, val = socket, user
    const socketUser = {}
    //key, val = user, socket
    const userSocket = {}
    
    const addUser = (user_id, socket_id)=>{
        if(userSocket[user_id])
            throw new Error("Error, user connected twice!")
        socketUser[socket_id] = user_id
        userSocket[user_id] = socket_id
    }
    
    const removeUser = (socket_id) =>{
        delete userSocket[socketUser[socket_id]]
        delete socketUser[socket_id]
    }
    
    io.on("connection", (socket)=>{
        console.log(`user ${socket.id} connected!`)
    
        //store user info on socket server
        socket.on("add user", (user_id)=>{
            console.log("adding user: ")
            console.log(user_id)
            addUser(user_id, socket.id)
        })
        
        //get message sent from react socket
        socket.on("send message", ({members, group, message})=>{
            if(!members)
                return
            //emit message to all members
            for(let member of members){
                if(userSocket[member]&&userSocket[member]!==socket.id){//if member is connected
                    const newMessage = {
                        content: message,
                        sender_id: socketUser[socket.id],
                        group_id: group
                    }
                    io.to(userSocket[member]).emit("get message", newMessage)
                }
            }
        })
    
        socket.on("disconnect", ()=>{
            let user_id = socketUser[socket.id]
            console.log(user_id)
            console.log(`user ${user_id} diconnected!`)
            removeUser(socket.id)
        })
    }) 
}

