import mongoose from "mongoose"
import { ObjectId } from "mongodb"
import dotenv from "dotenv"
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
    contacts: [Schema.Types.Mixed],
    medical_issues: [Schema.Types.Mixed],
    programs: [ObjectId]
})

const Kid = mongoose.model("Kid", KidSchema, process.env.KID_COLLECTION)
export default Kid