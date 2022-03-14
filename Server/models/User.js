import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { ObjectId } from "mongodb"
import dotenv from "dotenv"
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
    
})
userSchema.methods.validatePassword = async (password, encryptedPassword)=>{
    return await bcrypt.compare(password, encryptedPassword)
}

const User = mongoose.model("users", userSchema, process.env.USER_COLLECTION)
export default User