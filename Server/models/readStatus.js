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
    lastRead:{
        type: Date,
        default: Date.now
    },
})

export default readStatusSchema