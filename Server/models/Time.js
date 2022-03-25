import mongoose from "mongoose"
import { ObjectId } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const {Schema} = mongoose

const TimeSchema = new Schema({
    start_date:{
        type: Date,
        required:[true, "start date required"]
    },
    end_date:{
        type: Date,
        required:[true, "end date required"]
    },
    start_time:{//1440 minutes a day
        type: Number,
        min: [0, 'start time must be at least 0, got {VALUE}'],
        max: [1440, 'start time must <= 1440, got {VALUE}'],
        required:[true, "start time required"]
    },
    end_time:{
        type: Number,
        min: [0, 'end time must be at least 0, got {VALUE}'],
        max: [1440, 'end time must <= 1440, got {VALUE}'],
        required:[true, "end time required"]
    },
})

export default TimeSchema