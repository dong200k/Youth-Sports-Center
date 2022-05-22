import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { ObjectId } from "mongodb"
import dotenv from "dotenv"
import Program from "./Program.js"
dotenv.config()
const {Schema} = mongoose

const userSchema = new Schema({
    user_type: {
        type: String,
        required: [true, "user_type required!"],
        enum: ["Parent", "Instructor"]
    },
    first_name: {
        type: String,
        required: [true,"first_name required!"],
        minlength: 1
    },
    last_name: {
        type: String,
        // required: [true,"last_name required!"],
        minlength: 1
    },
    email: {
        type: String,
        required: [true,"email required!"],
        unique: true,
        //with this regular expression emails gota be at least 2 char before and after '@' sign
        //cannot end or start with '.' 
        //is only alphanumberical chars along with the  '.' char
        match: [/^[a-zA-Z0-9]+[a-zA-Z0-9.]*[a-zA-Z0-9]+@[a-zA-Z0-9]+[a-zA-Z0-9.]*[a-zA-Z0-9]+$/]
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        select: false
    },
    kids: {//for parents
        type: [ObjectId],
        default: undefined,
    },
    programs: {//for instructors
        type: [ObjectId],
        default: undefined,
    },
    contacts: [Schema.Types.Mixed],
})
userSchema.methods.validatePassword = async (password, encryptedPassword)=>{
    return await bcrypt.compare(password, encryptedPassword)
}

userSchema.methods.getConflictingProgram = async (instructor_id, {time, days}) =>{
    //filter for all programs instructor is in
    const program_filter = {
        instructors: ObjectId(instructor_id)
    }
    const programs = await Program.find(program_filter)

    for(const program of programs){
        
        let {start_time, end_time, start_date, end_date} = program.time
        //running period conflict
        if(!validateTime(start_date.getTime(), end_date.getTime(), time.start_date.getTime(), time.end_date.getTime()))
            //weekday conflict
            if(dayConflict(program.days, days))
                //time/hour conflict
                if(!validateTime(start_time, end_time, time.start_time, time.end_time)){
                    return program.program_name
                }
    }

    return null
}
function validateTime(start1, end1, start2, end2){
    return validateOneWay(start1, end1, start2, end2) && validateOneWay(start2, end2, start1, end1)
}
function validateOneWay(start1, end1, start2, end2){
    return ((start1<start2)||(start1>end2))&&((end1<start2)||(end1>end2))
}
function dayConflict(days1, days2){
    for(const day1 of days1){
        for(const day2 of days2){
            if(day1===day2)
                return true;
        }
    }
    return false;
}

const User = mongoose.model("users", userSchema, process.env.USER_COLLECTION||"users")
export default User