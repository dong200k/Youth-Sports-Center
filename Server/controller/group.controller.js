import { ObjectId } from "mongodb"
import Group from "../models/Group.js"
import User from "../models/User.js"

export default class GroupController{
    static async getGroups(req, res, next){
        const {id: user_id} = req.params

        try {
            //retrieve all groups user is member of
            const query = {
                members: {"$in": [ObjectId(user_id)]}
            }
            const groups = await Group.find(query)

            let groupsWithName = []

            for(let group of groups){
                //values to project + _id
                const projection={
                    first_name: 1,
                    last_name: 1,
                    user_type: 1
                }

                //project users data if they are in group
                const users = await User.find({_id: {"$in":group.members.map(member=>ObjectId(member))}}, projection)

                //build dictionary of (_id, names)
                let names = {}
                for(const user of users){
                    if(user.user_type==="Instructor")
                        if(user.last_name)
                            names[user._id] = "Instructor " + user.first_name + " " + user.last_name
                        else 
                            names[user._id] = "Instructor " + user.first_name
                    else
                        if(user.last_name)
                            names[user._id] = "Parent " + user.first_name + " " + user.last_name
                        else 
                            names[user._id] = "Parent " + user.first_name
                }
                
                //make array of member names
                const memberNames = []
                for(const member of group.members){
                    memberNames.push(names[member])
                }

                groupsWithName.push({
                    _id: group._id,
                    members: group._members,
                    name: group.name,
                    createdAt: group.createdAt,
                    memberNames: memberNames
                })
            }
            
            res.json({status:"success", groups: groupsWithName})
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