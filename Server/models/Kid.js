import mongoose from "mongoose"
import { ObjectId } from "mongodb"
import dotenv from "dotenv"
import Program from "./Program.js"
dotenv.config()

const {Schema} = mongoose

const KidSchema = new Schema({
    first_name: {
        type: String,
        required: [true,"first_name required!"],
        minlength: 1
    },
    last_name: {
        type: String,
        required: [true,"last_name required!"],
        minlength: 1
    },
    birth_date: {
        type: Date,
        required: [true, "birth day required!"],
    },
    gender: {
        type: String, 
        enum: ["Male","Female","N/A"]
    },
    // medical_issues: [Schema.Types.Mixed],
    programs: [ObjectId],
    medical_issues: {
        type: String,
        maxlength: 100
    }
})

KidSchema.methods.getConflictingProgram = async (kid_id, {time, days, _id}) =>{
    //filter for all programs kid is in
    const program_filter = {
        kids: ObjectId(kid_id)
    }
    const programs = await Program.find(program_filter)

    for(const program of programs){
        if(ObjectId(program._id)===ObjectId(_id))
            return program.name
        
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

const Kid = mongoose.model("Kid", KidSchema, process.env.KID_COLLECTION||"Kid")
export default Kid