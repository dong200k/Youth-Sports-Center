import mongoose from "mongoose"
import { ObjectId } from "mongodb"
import dotenv from "dotenv"
import AttendanceForOneDay from "./attendanceForOneDay.js"
dotenv.config()

const {Schema} = mongoose

const AttendanceSchema = new Schema({
    program_id:{
        type: ObjectId,
        required: [true, "program id required!"]
    },
    date: {
        type: Date,
        required: [true, "date required!"]
    },
    attendance:{
        type: [AttendanceForOneDay],
        default: []
    }
})

const Attendance = mongoose.model("Attendance", AttendanceSchema)
export default Attendance