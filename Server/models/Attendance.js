import mongoose from "mongoose"
import { ObjectId } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const {Schema} = mongoose

const AttendanceSchema = new Schema({
    kid_id:{
        type: ObjectId,
        required: [true, "kid id required!"]
    },
    program_id:{
        type: ObjectId,
        required: [true, "program id required!"]
    },
    date: {
        type: Date,
        required: [true, "date required!"]
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

const Attendance = mongoose.model("Attendance", AttendanceSchema)
export default Attendance