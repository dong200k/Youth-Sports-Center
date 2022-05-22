import mongoose from "mongoose"
import { ObjectId } from "mongodb"
import dotenv from "dotenv"
import Time from "./Time.js"
dotenv.config()

const {Schema} = mongoose

const programSchema = new Schema({
    program_name: {
        type: String,
        required: [true, "program name required!"],
        // unique: true
    },
    schedule: {
        type: [Date],
        default: []
    },
    sport_type:{
        type: String,
        required: [true, "sport type required"],
        // enum: ["soccer", "basketball", "football", "badminton", "handball", "volleyball", "tennis", "baseball"]
    },
    kids:{
        type: [ObjectId],
        default: []
    },
    instructors:{
        type: [ObjectId],
        default: []
    },
    ages:{
        type: [{type: Number, min: [0, "age must be >=0"]}],
        default: []
    },
    location:{
        type: String,
        required: [true, "Program location required"]
    },
    days:{
        type:[{
            type: String,
            enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        }], 
        default: []
    },
    time:{
        type: Time,
        required: [true, "time schema required!"]
    },
    capacity: {
        type: Number,
        default: 10,
        min: [1, "capacity must be >=1"],
    },
    enrolled: {
        type: Number,
        default: 0,
        min: [0, "enrolled must be >=0"],
    },
    waitlist: {
        type: [ObjectId],
        default: []
    },
    waitlist_capacity: {
        type: Number,
        default: 0,
        min: [0, "wait_list capacity must be >=0"],
    },
    waitlisted: {
        type: Number,
        default: 0,
        min: [0, "waitlisted must be >=0"],
    },
})

programSchema.methods.generateSchedule = ({days, time}) =>{
    const {start_date, end_date} = time
    console.log(start_date)
    console.log(end_date)
    let schedule = []

    for(const day of days){
        // const next = schedule.concat(generateDatesForDay(start_date, end_date, day))
        // console.log(next)
        schedule = schedule.concat(generateDatesForDay(start_date,end_date, day))
    }

    return schedule.sort((a,b)=>{
        return a-b
    })
}

function generateDatesForDay(start_date, end_date, day){
    const result = []
    const end = new Date(end_date)
    let currentDate = new Date(start_date)
    const weekdays = {
        "Sunday": 0,
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        'Saturday': 6
    } 
    
    console.log(currentDate)
    console.log(currentDate.getUTCDate())
    console.log(currentDate.getUTCDay())
    //start on first day week day, e.g. start on first monday instead of the start_date which may be tuesday
    //getDate gets the day of the month 1-31, getDay gets 0-6(sun-sat)
    let shift = currentDate.getUTCDay()-weekdays[day]
    if(shift<=0){
        currentDate.setDate(currentDate.getDate() - shift)
    }
    else{
        currentDate.setDate(currentDate.getDate() + 7-shift)
    }

   
    while(currentDate.getTime()<=end.getTime()){
        result.push(new Date(currentDate))
        //move 7 days to next week day/monday
        currentDate.setDate(currentDate.getDate()+7)
    }

    return result
}

const Program = mongoose.model("Program", programSchema, process.env.PROGRAM_COLLECTION||"programs")
export default Program