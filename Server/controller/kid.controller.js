import { ObjectId } from "mongodb";
import Kid from "../models/Kid.js";
import User from "../models/User.js";
import Program from "../models/Program.js";

export default class KidController{
    static async addKid(req, res, next){
        //grab kid info 
        const {first_name, last_name, birth_date, gender, medical_issues, parent_id} = req.body
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
                medical_issues: medical_issues,
                // programs: programs
            }
            
            const kid = new Kid(new_kid)

            //try to insert kid
            await kid.save()
                .catch(()=>{throw new Error("error saving kid in addkid")})

            //try to add kid id to parent document
            parent.kids.push(ObjectId(kid._id))
            await parent.save()
                .catch(()=>{throw new Error("error saving parent in addkid")})
            res.json({status:'success', kid: kid, parent: parent})

        }catch(e){
            res.status(404).json({error: e.message})
        }
    }
    static async getKids(req, res, next){
        const {id: parent_id} = req.params

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
        console.log("update kid")
        //grab kid info 
        const {first_name, last_name, birth_date, gender, medical_issues, _id} = req.body
        try{
            //find kid
            const kid = await Kid.findById(ObjectId(_id))

            if(!kid)
                throw new Error("Kid not found!")

            //update
            const update = {
                first_name: first_name, 
                last_name: last_name,
                birth_date: new Date(birth_date),
                gender: gender,
                medical_issues: medical_issues,
            }
            
            
            for (const key in update){
                //if value to update is not null
                if(update[key]!=undefined)
                    kid[key] = update[key]
            }
            
            console.log(update)

            //try to update kid
            await kid.save()
                .catch(()=>{throw new Error("error saving kid in updateKid")})
            console.log(kid)
            // for(const key in update){
            //     if(update[key])
            //         if(kid[key]!==update[key]){
            //             throw new Error("update failed")
            //         }
            // }

            res.json({status:'success', kid: kid})

        }catch(e){
            console.log(e.message)
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
            
            let program = await Program.findOne({kids: ObjectId(kid_id)})
            if(program)
                throw new Error("Cannot delete kid enrolled in program!")

            //delete kid
            const info = await Kid.deleteOne({"_id":ObjectId(kid_id)})

            //no kids removed
            if(info.deletedCount===0)
                throw new Error("No kids were deleted!")
            
            //filter out kid with the id
            parent.kids = parent.kids.filter(kid=>kid.toString()!==kid_id)   

            //save parent
            await parent.save()
                .catch(()=>{throw new Error("error saving parent in deleteKid")})
            
            // //remove kids from programs
            // const program_filter = {
            //     kids: ObjectId(kid_id)
            // }
            // const set = {
            //     "$set": {enrolled: {"$inc": -1}},
            // }
            // await Program.updateMany(program_filter, set)

            // const pull = {
            //     "$pull": {kids: ObjectId(kid_id)}
            // }
            // await Program.updateMany(program_filter, pull)

            res.json({status:"success", info: info, parent: parent, kid_id: kid_id})

        } catch (e) {
            console.log(e)
            res.status(403).json({error: e.message})
        }
    }
}