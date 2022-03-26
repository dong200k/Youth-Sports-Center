import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { ObjectId } from "mongodb";
export default class UserController{
    static async Login(req, res, next){
        const {email, password} = req.body;
        
        //email or password is empty
        if(!email || !password){
            res.json({error: "Please enter email and password!"})
            return
        }
        try{
            let query = {
                email: email
            }
            // find user by email, select password explicitly since "select":false for password in UserSchema
            const user = await User.findOne(query).select("+password");
            
            // no such email
            if(!user){
                res.json({error: "Invalid Credentials!"})    
                return
            }

            // wrong password
            const match = await user.validatePassword(password, user.password)
            if(!match){
                res.json({error: "Invalid Credentials!"})    
                return
            }
                
            res.json({status: "success", user: user})

        }catch(e){
            res.json({error: e.message})
        }
    }
    static async Register(req, res, next){
        const {first_name, last_name, email, password, user_type} = req.body
        try{
            //generate salt and encrypt password
            const salt = await bcrypt.genSalt(10);
            let encryptedPassword = await bcrypt.hash(password, salt);

            const newUser = {
                first_name: first_name,
                // last_name: last_name,
                email: email,
                password: encryptedPassword,
                user_type: user_type,
                kids: user_type==="Parent"?[]:undefined,
                programs: user_type==="Instructor"?[]:undefined,
            }
            const user = new User(newUser)
            //try to save
            await user.save((err)=>{    
                if(err){
                    res.json({error: err})
                }else
                    res.json({status: "success", user: user})
            })
        }catch(e){
            res.json({error: e.message})
        }
    }
    static async getInstructors(req, res, body){
        const {user_id} = req.body
        try {
            //filter for instructor
            const user_filter = {
                _id: ObjectId(user_id),
                user_type: "Instructor"
            }
            const user = await User.findOne(user_filter)

            //make sure user is instructor
            if(!user){
                throw new Error("Only instructors can access this information!")
            }

            //filter for all instructors
            const instructor_filter = {
                user_type: "Instructor"
            }
            //take only the _id and names
            const projection = {
                first_name: 1
            }
            const instructors = await User.find(instructor_filter, projection)
            
            res.json({status:"success", instructors: instructors})

        } catch (e) {
            res.status(404).json({error: e.message})
        }
    }
}