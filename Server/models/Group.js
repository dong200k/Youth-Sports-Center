import mongoose from "mongoose"
import { ObjectId } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const {Schema} = mongoose

const GroupSchema = new Schema({
    members:{
        type: [ObjectId],
        default: []
    },
    name:{
        type: String,
        required: [true, "group name required!"]
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Group = mongoose.model("Group", GroupSchema, process.env.GROUP_COLLECTION||"groups")
export default Group