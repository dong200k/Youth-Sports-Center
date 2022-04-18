import { ObjectId } from "mongodb"
import Group from "../models/Group.js"

export default class GroupController{
    static async getGroups(req, res, next){
        const {id: user_id} = req.params

        try {
            //retrieve all groups user is member of
            const query = {
                members: {"$in": [ObjectId(user_id)]}
            }
            const groups = await Group.find(query)
            res.json({status:"success", groups: groups})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }   
    static async createGroup(req, res, next){
        const {members, name} = req.body

        try{
            const query = {
                members: members.map(member=>ObjectId(member)),
                name : name
            }
            const group = new Group(query)
            await group.save()
                    .then(()=>{
                        return res.json({status:"success", group: group})
                    })
                    .catch(err=>{
                        throw new Error(err.message)
                    })
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}