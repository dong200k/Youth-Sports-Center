import mongoose from "mongoose"
import { ObjectId } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const {Schema} = mongoose

const MessageSchema = new Schema({
    group_id:{
        type: ObjectId,
        required: [true, "group id required!"]
    },
    sender_id:{
        type: ObjectId,
        required: [true, "sender_id required"]
    },
    content:{
        type: String,
        required: [true, "message required"]
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const Message = mongoose.model("Message", MessageSchema)
export default Message