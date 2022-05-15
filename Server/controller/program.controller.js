import { ObjectId } from "mongodb";
import Program from "../models/Program.js"
import Attendance from "../models/Attendance.js"
import Kid from "../models/Kid.js";
import User from "../models/User.js";
import ProgramDAO from "../dao/programDAO.js";
import Group from "../models/Group.js";

export default class ProgramController{
    //program search
    static async getProgram(req, res, next){    
        const {days, ages, sports, locations, user_id, pageNumber, pageSize, program_id} = req.body.filter
        try{

            //filter for days, ages, sports, and locations
            const filter_days = days? {
                days:{
                    "$in": days
                }
            }:
            null

            const filter_ages = ages? {
                ages:{
                    "$in": ages
                }
            }:
            null

            const filter_sports = sports? {
                sport_type:{
                    "$in": sports
                }
            }:
            null

            const filter_locations = locations? {
                location:{
                    "$in": locations
                }
            }:
            null

            const program_id_filter = program_id?{
                _id: ObjectId(program_id)
            }:
            null

            const user = await User.findById(ObjectId(user_id))
            
            let user_filter
            if(user?.user_type==="Parent"){
                const kid_ids = user.kids.map(kid=> ObjectId(kid))
                
                //filter for programs of the parent's kids
                user_filter = {
                    kids: {
                        "$in": kid_ids
                    }
                }
            }else if(user?.user_type==="Instructor"){
                //filter for programs instructor teach
                user_filter = {
                    instructors: ObjectId(user_id)
                }
            }

            //if filter exists add to pipeline array of filters
            const filters = []
            if(program_id)filters.push(program_id_filter)
            if(filter_days)filters.push(filter_days)
            if(filter_ages)filters.push(filter_ages)
            if(filter_locations)filters.push(filter_locations)
            if(filter_sports)filters.push(filter_sports)
            if(user_filter)filters.push(user_filter)

            //if there is one or more filters create match object
            let match 
            if(filters.length>0)
                match = {"$match": {
                    "$and": filters
                }}
            else
                match = {"$match": {}} 
            const pipeline = [  
                match,
                // page info and total programs
                { '$facet'    : {
                    metadata: [ { $count: "total" }, { $addFields: { page: pageNumber } } ],
                    data: [ { $skip: (pageNumber-1)*pageSize }, { $limit: pageSize } ] // add projection here wish you re-shape the docs
                } }
            ]

            //aggregate pipeline
            const metadata = await ProgramDAO.filterProgram(pipeline)
            const programs = metadata[0].data
            if(!metadata){
                throw new Error("filtering program failed!")
            }else{
                let instructorNames = await User.find({user_type:"Instructor"}, {first_name: 1})
                let dict = {}
                for(const i of instructorNames){
                    dict[i._id] = i.first_name
                }
                for(let i=0;i<programs.length;i++){
                    let program = programs[i]
                    if(program.instructors){
                        programs[i] = await ProgramController.addInstructorName(program, dict)
                    }
                }
                res.json({status:"success", result: metadata})
            }
        }catch(e){
            console.log(e.message)
            res.status(404).json({error: e.message})
        }
    }
    static async addInstructorName(program, dict){
        try {
            program.instructors = program.instructors.map(instructor=>{
                return {
                    _id: instructor,
                    first_name: dict[instructor]
                }
            })
            return program
        } catch (error) {
            console.log(error.message)
            throw new Error("error adding instructor names")
        }
    }
    static async postProgram(req, res, next){
        const {program_name, days, location, ages, sport_type, 
            capacity, waitlist_capacity, time, user_id, instructors
        } = req.body
        console.log(req.body)
        try{

            const filter_instructor = {
                _id: ObjectId(user_id),
                user_type: "Instructor"
            }

            const user = await User.findById(filter_instructor)

            if(!user){
                throw new Error("must be instructor to access!")
            }

            if(time.end_time<=time.start_time){
                throw new Error("end time must be after start time")
            }

            //for sorting days monday to sunday
            const sortDay = ()=>{
                const day_dict={"Monday": 1, "Tuesday": 2, "Wednesday":3, "Thursday": 4, "Friday":5, "Saturday": 6, "Sunday":7}
                return (a,b)=>day_dict[a]-day_dict[b]
            }
            const new_program = {
                program_name: program_name, 
                sport_type: sport_type, 
                location: location, 
                days: days.sort(sortDay()), 
                ages: ages.sort((a,b)=>a-b),
                capacity: capacity, 
                waitlist_capacity: waitlist_capacity, 
                time:{
                    start_date: new Date(time.start_date),
                    end_date: new Date(time.end_date),
                    start_time: time.start_time,
                    end_time: time.end_time
                },
                instructors: instructors.map(instructor=>ObjectId(instructor))
            }

            for(const key in new_program){
                //if any key is not defined
                if(new_program[key]===undefined)
                    delete new_program[key]
            }

            const program = Program(new_program)

            //generate schedule 
            const schedule = program.generateSchedule(program)
            program.schedule = schedule

            program.save(err=>{
                if(err)
                    res.status(404).json({error: err.message})
                else   
                    res.json({status:"success", program: program})
            })
                // .catch(()=>{throw new Error("error saving program in post program")})
            }catch(e){
            console.log(e.message)
            res.status(404).json({error: e.message})
        }
    }
    static async updateProgram(req, res, next){
        const {program_name, days, location, ages, sport_type, 
            capacity, waitlist_capacity, instructors, time, user_id, program_id
        } = req.body

        try{
            //must be instructor to edit
            const filter_instructor = {
                _id: ObjectId(user_id),
                user_type: "Instructor",
                // commented line allows only instructor with this program in their program list to edit it
                // programs: ObjectId(program_id)
            }

            const user = await User.findById(filter_instructor)

            if(!user){
                throw new Error("must be instructor to access!")
            }

            const filter_program = {
                _id: program_id
            }

            const instructor_ids = instructors.map(instructor=>ObjectId(instructor))

            //filter for instructors we are adding to program
            const instructor_filter = {
                _id: {
                    "$in": instructor_ids
                },
                user_type: "Instructor"
            }
            const instructors_to_add = await User.find(instructor_filter)

            if(instructors_to_add.length!==instructors.length){
                throw new Error("invalid instructor to add!")
            }

            const update = {
                program_name: program_name,
                sport_type: sport_type, 
                location: location, 
                days: days, 
                ages: ages,
                capacity: capacity, 
                waitlist_capacity: waitlist_capacity, 
                time: time,
                instructors: instructor_ids
            }
            const program = await Program.findOne(filter_program)

            if(!program){
                throw new Error("Invalid program id")
            }

            for (const key in update){
                //if value to update is not null
                if(update[key])
                    program[key] = update[key]
            }

            program.save(err=>{
                if(err)
                    res.status(404).json({error: err.message})
                else
                    res.json({status:"success", program: program})
            })
            .catch(()=>{throw new Error("error saving program in update program")})
        }catch(e){
            res.status(404).json({error: e.message})
        }
    }
    //delete program
    static async deleteProgram(req, res, next){
        const {program_id, user_id} = req.body
        try{

            //must be instructor to delete program
            const filter_instructor = {
                _id: ObjectId(user_id),
                user_type: "Instructor",
                // programs: ObjectId(program_id)
            }

            const user = await User.findById(filter_instructor)

            if(!user){
                throw new Error("must be instructor to access!")
            } 

            Program.findByIdAndDelete(ObjectId(program_id), (err, doc)=>{
                if(err){
                    console.log(err.message)
                    res.status(404).json({error: err.message})
                }
                else if(!doc){
                    console.log("no program with that id")
                    res.status(404).json({error: "no program with that id"})
                }
                else
                    res.json({status:"success", program: doc})
            })
        }catch(e){
            console.log(e.message)
            res.status(404).json({error: e.message})
        }
    }
    //program enrollment
    static async enrollKid(req, res, next){
        const {program_id, parent_id, kids} = req.body
        try{
            let kid_ids = kids.map(id=>ObjectId(id))
            //filter for parent 
            const parent_filter = {
                _id: ObjectId(parent_id),
                kids: {
                    "$all": kid_ids
                },
                user_type: "Parent"
            }

            //ensure parent is valid
            const parent = await User.findOne(parent_filter)
            if(!parent){
                res.status(404).json({error: "invalid parent!"})
            }

            //get all kids
            const kid_filter = {
                _id: {
                    "$in": kid_ids
                }
            }
            //check that kids exist
            const listKids = await Kid.find(kid_filter)
            if(listKids.length!=kids.length){
                throw new Error("invalid kid!")
            }

            //validate capacity>enrolled, program exist, and kids not already enrolled
            const excluded_kids = []
            for(const kid_id of kids){
                excluded_kids.push(ObjectId(kid_id))
            }
            const program_filter = {
                _id: ObjectId(program_id),
                kids: {
                    "$nin": excluded_kids
                },
                "$expr":{
                    $gt:["$capacity", "$enrolled"]
                }
            }
            const program = await Program.findOne(program_filter)
            if(!program){
                throw new Error("invalid program or a kid is already enrolled")
            }

            //check that program can fit all the kids
            if(program.capacity<program.enrolled+kids.length){
                throw new Error("program cannot fit all the kids!")
            }

            //check for time conflict for every kid
            for(const kid_id of kids){
                let conflictingProgram = await Kid().getConflictingProgram(kid_id, program)
                if(conflictingProgram){
                    throw new Error(`kid ${kid_id} has program conflict with ${conflictingProgram}`)
                }
            }

            //add every kid to program
            for(const kid_id of kids){
                program.kids.push(ObjectId(kid_id))
            }

            //update enrolled kids
            program.enrolled = program.kids.length

            //attempt to save
            await program.save()
                .then(()=>res.json({status:"success", program: program}))
                .catch((err)=>{
                    console.log(err)
                    throw new Error("error saving program in enrollkid")}
                )
            console.log("saved program")
            //create group chat for parent and all program instructors
            const members = [...program.instructors.map(_id=>ObjectId(_id)), ObjectId(parent_id)]
            const group_name = program.program_name + " | " + parent.first_name
            let group_filter = {
                name: group_name
            }
            //find if group chat already exist
            let group_chat = await Group.findOne(group_filter)
            if(!group_chat){
                console.log("group chat")
                //create group chat if not exist
                const query = {
                    members: members,
                    name : group_name
                }
                const group = new Group(query)
                await group.save()
                    .then(()=>{
                        console.log("parent-instructors group created successfully in program controller enrollKid")
                    })
                    .catch(err=>{
                        throw new Error(err.message)
                    })
            }
        }catch(e){
            console.log(e.message)
            res.status(404).json({error: e.message})
        }
    }
    static async dropKidsProgram(req, res, next){
        const {kids, program_id, parent_id} = req.body
        try {
            let kid_ids = kids.map(id=>ObjectId(id))
            //filter for parent 
            const parent_filter = {
                _id: ObjectId(parent_id),
                kids: {
                    "$all": kid_ids
                },
                user_type: "Parent"
            }

            //ensure parent is valid
            if(!User.findOne(parent_filter)){
                res.status(404).json({error: "invalid parent!"})
            }

            //get all kids
            const kid_filter = {
                _id: {
                    "$in": kid_ids
                }
            }
            //check that kids exist
            const listKids = await Kid.find(kid_filter)
            if(listKids.length!=kids.length){
                throw new Error("invalid kid!")
            }

            //grab program
            const program = await Program.findById(ObjectId(program_id))

            if(!program){
                throw new Error("cannot drop program that does not exist")
            }

            //filter out kids to drop from program
            program.kids = program.kids.filter(enrolledKid=>{
                // console.log(enrolledKid)
                for(const kidToDrop of kids){
                    if(kidToDrop===enrolledKid.toString())
                        return false
                }
                return true
            })

            program.enrolled = program.kids.length

            program.save()
            .then(()=>{
                res.json({status:"success", program: program})
            })
            .catch((err)=>{
                console.log(err)
                throw new Error("error saving program in dropkids")}
            )

        } catch (error) {
            res.status(404).json({error: error.message})
        }
    }
    static async getUserProgram(req, res, body){
        const {id: user_id} = req.params
        try {
            // console.log(user_id)
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

            res.json({status:"success", programs: programs})
        } catch (e) {
            res.status(404).json({error: e.message})
        }
    }
}