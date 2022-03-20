import { ObjectId } from "mongodb";
import Kid from "../models/Kid.js";
import User from "../models/User.js";

export default class KidController{
    static async addKid(req, res, next){
        //grab kid info 
        const {first_name, last_name, birth_date, gender, contacts, medical_issues, programs, parent_id} = req.body
        
        try{
            //check parent exist
            let parent = await User.findById({"_id":ObjectId(parent_id), user_type: "Parent"})
            if(!parent || parent.user_type!=="Parent"){
                throw new Error("User must be a parent to add kids!")
            }
            //kid to create
            const new_kid = {
                first_name: first_name, 
                last_name: last_name,
                birth_date: new Date(birth_date),
                gender: gender,
                contacts: contacts,
                medical_issues: medical_issues,
                programs: programs
            }
            
            const kid = new Kid(new_kid)

            //try to insert kid
            await kid.save(err=>{
                if(err)
                    throw new Error("Error saving kid!")
            })
            //try to add kid id to parent document
            parent.kids.push(ObjectId(kid._id))
            await parent.save(err=>{
                if(err)
                    throw new Error("Error adding kid id to parent!")
            })
            res.json({status:'success', kid: kid, parent: parent})

        }catch(e){
            res.status(404).json({error: e.message})
        }
    }
    static async getKids(req, res, next){
        const {parent_id} = req.body

        try{
            //find parent
            let parent = await User.findOne({"_id":ObjectId(parent_id), user_type: "Parent"})
            if(!parent)
                throw new Error("invalid parent id!")
            
            //filter for parent's kids
            const filter = {
                "_id": {
                    "$in": parent.kids.map(kid=>ObjectId(kid))
                }
            }
            const kids = await Kid.find(filter)
            res.json({status:"success", kids:kids})
        }
        catch(e){
            res.status(404).json({error: e.message})
        }
        
    }
    static async updateKid(req, res, next){
        //grab kid info 
        const {first_name, last_name, birth_date, gender, contacts, medical_issues, programs, _id} = req.body
        
        try{
            //kid to update
            const update = {
                first_name: first_name, 
                last_name: last_name,
                birth_date: new Date(birth_date),
                gender: gender,
                contacts: contacts,
                medical_issues: medical_issues,
                programs: programs
            }
            
            const kid = await Kid.findById(ObjectId(_id))

            if(!kid)
                throw new Error("Kid not found!")
            
            for (const key in update){
                //if value to update is not null
                if(update[key])
                    kid[key] = update[key]
            }
            
            //try to update kid
            await kid.save(err=>{
                if(err)
                    throw new Error("Error saving kid!")
            })
            
            res.json({status:'success', kid: kid})

        }catch(e){
            res.status(404).json({error: e.message})
        }
    }
    static async deleteKid(req, res, next){
        //grab id of kid to delete and their parent
        const {parent_id, kid_id} = req.body

        try {
            //find parent
            let filter = {
                _id: ObjectId(parent_id),
                kids: ObjectId(kid_id),
                user_type: "Parent"
            }
            const parent = await User.findOne(filter)
            if(!parent)
                throw new Error("Invalid parent!")
            
            //delete kid
            const info = await Kid.deleteOne({"_id":ObjectId(kid_id)})

            //no kids removed
            if(info.deletedCount===0)
                throw new Error("No kids were deleted!")
            
            //filter out kid with the id
            parent.kids = parent.kids.filter(kid=>kid.toString()!==kid_id)   

            //save parent
            await parent.save(err=>{
                if(err)
                    throw new Error("Issue saving parent!")
                console.log("parent")
            })

            res.json({status:"success", info: info, parent: parent, kid_id: kid_id})

        } catch (e) {
            res.status(404).json({error: e.message})
        }
    }
}