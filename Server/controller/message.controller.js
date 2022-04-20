import { ObjectId } from "mongodb"
import Group from "../models/Group.js"
import Message from "../models/Message.js"

export default class MessageController{
    static async getMessages(req, res, next){
        const {id: group_id} = req.params

        try {
            const messages = await Message.find({group_id: ObjectId(group_id)})
            res.json({status:"success", messages: messages})
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