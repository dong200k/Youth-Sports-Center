import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { ObjectId } from "mongodb"
import dotenv from "dotenv"
dotenv.config()
const {Schema} = mongoose

const userSchema = new Schema({
    user_type: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
        minlength: 1
    },
    last_name: {
        type: String,
        required: false,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
userSchema.methods.validatePassword = async ()=>{
    //this is the user object that called this method
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("Users", userSchema, process.env.USER_COLLECTION)
export default User