import mongoose from "mongoose"
import { ObjectId } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const {Schema} = mongoose

const AttendanceForOneDaySchema = new Schema({
    kid_id:{
        type: ObjectId,
        required: [true, "kid id required for attendance"]
    },
    attended:{
        type: Boolean,
        default: false
    },
    notes: {
        type: String,
        default: ""
    }
})

export default AttendanceForOneDaySchema