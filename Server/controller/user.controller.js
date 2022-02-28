import User from "../models/User.js"
import bcrypt from "bcryptjs"
export default class UserController{
    static async Login(req, res, next){
        const {email, password} = req.body;
        console.log(email)
        console.log(password)
        if(!email || !password){
            res.json({error: "Please enter email and password!"})
            return
        }
        try{
            let query = {
                email: email
            }
            // find user, select password explicitly since "select":false for password in UserSchema
            const user = await User.findOne(query);

            // no such email
            if(!user){
                res.json({error: "Invalid Credentials!"})    
                return
            }

            // wrong password
            let check = await user.validatePassword()
            if(!check){
                res.json({error: "Invalid Credentials!"})    
                return
            }

            res.json({status: "success", user: user})

        }catch(e){
            res.json({error: e.message})
        }
    }
    static async Register(req, res, next){
        const {first_name, last_name, email, password} = req.body
        try{
            //generate salt and encrypt password
            const salt = await bcrypt.genSalt(10);
            let encryptedPassword = await bcrypt.hash(password, salt);

            const doc = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: encryptedPassword,
                user_type: "Parent"
            }
            const user = new User(doc)
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
}