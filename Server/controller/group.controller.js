import { ObjectId } from "mongodb"
import Group from "../models/Group.js"
import User from "../models/User.js"
import Program from "../models/Program.js"
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
                    memberNames: memberNames,
                    readStatus: group.readStatus
                })
            }
            
            res.json({status:"success", groups: groupsWithName})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }   
    static async getGroupsForUser(req, res, next){
        const {id: user_id} = req.params

        try {
            const user = await User.findById(ObjectId(user_id))
            if(!user){
                throw new Error("invalid user in getUserProgram!")
            }

            let programs
            if(user.user_type==="Parent"){
                const kid_ids = user.kids.map(kid=> ObjectId(kid))
                
                //filter for programs of the parent's kids
                const program_filter = {
                    kids: {
                        "$in": kid_ids
                    }
                }

                programs = await Program.find(program_filter)
            }else if(user.user_type==="Instructor"){    
                //filter for programs instructor teach
                const program_filter = {
                    instructors: ObjectId(user_id)
                }

                programs = await Program.find(program_filter)
            }

            const classes = []
            //build new programs
            for(const program of programs){
                if(program.kids.length===0)
                    continue
                const programWithUsersAndGroups = {
                    _id: program._id,
                    name: program.program_name,
                }
                //get instructors of program
                const filterInstructor = {
                    _id: {
                        "$in": program.instructors.map(i=>ObjectId(i._id))
                    }
                }
                
                //get parents if their kid is in program
                const filterParent = {
                    kids:{
                        "$in": program.kids.map(k=>ObjectId(k._id))
                    }
                }
                //project user's _id, first and last name
                const userProjection = {
                    first_name: 1,
                    last_name: 1,
                    user_type: 1
                }
                //get instructor/parent part of class
                const users = await User.find({"$or": [filterParent, filterInstructor]}, userProjection)

                //build add group to each user (group with whoever made this api request)
                const usersWithGroup = []

                for(const user of users){
                    if(user._id.equals(user_id))
                        continue
                    let userWithGroup = {
                        user_id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        user_type: user.user_type
                    }

                    //find group
                    const filter = {
                        members: {
                            "$size": 2,
                            "$all": [ObjectId(user._id), ObjectId(user_id)]
                        }
                    }
                    let group = await Group.findOne(filter)

                    if(!group){
                        //create the group
                        const query = {
                            members: [ObjectId(user._id), ObjectId(user_id)],
                            name : program.program_name,
                            readStatus: [
                                {
                                    user_id: ObjectId(user_id)
                                },
                                {
                                    user_id: ObjectId(user._id)
                                }
                            ]
                        }
                        group = new Group(query)
                        //try to save
                        let {err} = await group.save()
                        if(err)
                            throw new Error(err)
                    }
                    userWithGroup.group = group
                    usersWithGroup.push(userWithGroup)
                }

                programWithUsersAndGroups.users = usersWithGroup

                classes.push(programWithUsersAndGroups)
            }

            
            res.json({status:"success", classes: classes})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }   
    static async updateOpenStatus(req, res, next){
        const {group_id: _id, user_id, readStatus} = req.body
        console.log(req.body)
        try {
            const group = await Group.findById(ObjectId(_id))

            group.readStatus = group.readStatus.map(status=>{
                if(status.user_id.equals(ObjectId(user_id))){
                    readStatus.lastModified = status.lastModified
                    return readStatus
                }else return status
            })
            await group.save()
                .then(()=>{
                    return res.json({status:"success", group: group})
                })
                .catch(err=>{
                    throw new Error(err.message)
                })
        } catch (error) {
            console.log(error.message)
            res.status(401).json({error: error.message})
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