import mongoose from "mongoose"
import { ObjectId } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const {Schema} = mongoose

const readStatusSchema = new Schema({
    user_id:{
        type: ObjectId,
        required:[true, "user_id required"]
    },
    lastOpened:{
        type: Date,
        default: Date.now
    },
    lastModified:{
        type: Date,
        default: Date.now
    },
})

export default readStatusSchema