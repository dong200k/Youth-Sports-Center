import { ObjectId } from "mongodb"
import Group from "../models/Group.js"
import Message from "../models/Message.js"
import User from "../models/User.js"

export default class MessageController{
    static async getMessages(req, res, next){
        const {id: group_id} = req.params
        
        try {
            const group = await Group.findById(ObjectId(group_id))
            if(!group)
                throw new Error("groupchat does not exist!")
            
            const messages = await Message.find({group_id: ObjectId(group_id)})

            //get users's username if they are in group
            const users = await User.find({_id: {"$in":group.members.map(member=>ObjectId(member))}})
            //build dictionary of (_id, names)
            let names = {}
            for(const user of users){
                names[user._id] = user.first_name + " " + user.last_name
            }
 
            //append names to messages
            const messagesWithNames = []
            for(const message of messages){
                let newMessage = {
                    group_id: message.group_id,
                    sender_id: message.sender_id,
                    content: message.content,
                    _id: message._id,
                    sender_name: names[message.sender_id]
                }

                messagesWithNames.push(newMessage)
            }
            res.json({status:"success", messages: messagesWithNames})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    static async postMessage(req, res, next){
        const {group_id, sender_id, content} = req.body
        
        try {
            //user is in a real group
            const query = {
                _id: ObjectId(group_id),
                members: ObjectId(sender_id)
            }
            const group = await Group.findOne(query)
            
            if(!group)
                throw new Error("can only post message to a group you are in!")

            const message = {
                group_id: ObjectId(group_id),
                sender_id: ObjectId(sender_id),
                content: content
            }

            await 
                new Message(message).save()
                    .then(()=>{
                        res.json({status:"success", message: message})
                    })
                    .catch(err=>{
                        throw new Error("error posting message!")
                    })
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}