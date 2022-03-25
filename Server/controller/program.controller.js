import { ObjectId } from "mongodb";
import Program from "../models/Program.js"
import Attendance from "../models/Attendance.js"
import Kid from "../models/Kid.js";
import User from "../models/User.js";
import ProgramDAO from "../dao/programDAO.js";

export default class ProgramController{
    //program search
    static async getProgram(req, res, next){
        const {days, ages, sports, locations, pageNumber, pageSize, program_id} = req.body.filter
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

            const program_id_filter = program?{
                _id: ObjectId(program_id)
            }:
            null

            //if filter exists add to pipeline array of filters
            const filters = []
            if(program_id)filters.push(program_id_filter)
            if(filter_days)filters.push(filter_days)
            if(filter_ages)filters.push(filter_ages)
            if(filter_locations)filters.push(filter_locations)
            if(filter_sports)filters.push(filter_sports)

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
            const programs = await ProgramDAO.filterProgram(pipeline)

            if(!programs){
                throw new Error("filtering program failed!")
            }else{
                res.json({status:"success", result: programs})
            }
        }catch(e){
            res.status(404).json({error: e.message})
        }
    }
    static async postProgram(req, res, next){
        const {program_name, days, location, ages, sport_type, 
            capacity, waitlist_capacity, time, user_id, instructors
        } = req.body

        try{

            const filter_instructor = {
                _id: ObjectId(user_id),
                user_type: "Instructor"
            }

            const user = await User.findById(filter_instructor)

            if(!user){
                throw new Error("must be instructor to access!")
            }

            const new_program = {
                program_name: program_name, 
                sport_type: sport_type, 
                location: location, 
                days: days, 
                ages: ages,
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
        }catch(e){
            res.status(404).json({error: e.message})
        }
    }
    static async updateProgram(req, res, next){
        const {program_name, days, location, ages, sport_type, 
            capacity, waitlist_capacity, time, user_id, program_id
        } = req.body.filter

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

            update = {
                program_name: program_name,
                sport_type: sport_type, 
                location: location, 
                days: days, 
                ages: ages,
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
                if(err)
                    res.status(404).json({error: err.message})
                else if(!doc)
                    res.status(404).json({error: "no program with that id"})
                else
                    res.json({status:"success", program: doc})
            })
        }catch(e){
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
                    throw new Error(`${kid_id} program conflict with ${conflictingProgram}`)
                }
            }

            //add every kid to program
            for(const kid_id of kids){
                program.kids.push(ObjectId(kid_id))
            }

            //update enrolled kids
            program.enrolled = program.kids.length

            //attempt to save
            program.save(err=>{
                if(err){
                    throw new Error("enrollment error")
                }else{
                    res.json({status:"success", program: program})
                    return
                }
            })
        }catch(e){
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
                console.log(enrolledKid)
                for(const kidToDrop of kids){
                    if(ObjectId(kidToDrop)===ObjectId(enrolledKid))
                        return true
                }
                return false
            })

            program.enrolled = program.kids.length

            program.save(err=>{
                if(err)
                    throw new Error(err.message)
                else
                    res.json({status:"success", program: program})
            })

        } catch (error) {
            res.status(404).json({error: error.message})
        }
    }
}