import { ObjectId } from "mongodb";
import Program from "../models/Program.js"
import Kid from "../models/Kid.js"
import Attendance from "../models/Attendance.js";

export default class AttendanceController{
    static async getAttendance(req, res, next){
        const{date, program_id} = req.query

        try {
            //get program to take attendance for
            const program = await Program.findById(ObjectId(program_id))
            if(!program)
                throw new Error("invalid program")
            
            //get kids in program and their name
            const kidFilter = {
                _id: {"$in": program.kids.map(kid=>ObjectId(kid))}
            }
            const kids = await Kid.find(kidFilter)
            if(kids.length!==program.kids.length)
                throw new Error("error in attendance, could not retrieve all kids in program")

            const attendanceFilter = {
                program_id: program_id,
                date: new Date(date)
            }
            const attendance = await Attendance.findOne(attendanceFilter)

            let attendanceWithNames

            //check attendance date is valid
            let matchOneDate = false
            for(const programDate of program.schedule){
                if(new Date(programDate).getTime()===new Date(date).getTime()){
                    matchOneDate = true
                    break
                }
            }
            if(!matchOneDate)
                return res.status(403).json({error: "date has no class in session!"})

            if(!attendance){
                //no attendance for that day yet, generate new one
                attendanceWithNames = []
                
                for(const kid of kids){
                    let attendance = {
                        kid_id: kid._id,
                        attended: false,
                        kid_name: kid.first_name + " " + kid.last_name
                    }
                    attendanceWithNames.push(attendance)
                }
            }
            else{
                //attendance already taken get that one
                attendanceWithNames = []
                const oldAttendance = attendance.attendance

                for(const record of oldAttendance){
                    let attendance = {
                        kid_id: record.kid_id,
                        notes: record.notes,
                        attended: record.attended,
                        kid_name: record.first_name + " " + record.last_name
                    }
                    attendanceWithNames.push(attendance)
                }
                // console.log(attendanceWithNames)
                //assign kid names to attendance
                for(const i in attendanceWithNames){
                    //get kid for ith attendance(kid_id, attended boolean)
                    let ithKid = kids.find(kid=>kid._id.toString()===attendanceWithNames[i].kid_id.toString())
                    //write their name to the attendance with names
                    attendanceWithNames[i].kid_name = ithKid.first_name + " "+ ithKid.last_name
                }
                console.log(attendanceWithNames)
            }
            res.json({status: "success", attendance: attendanceWithNames})
        } catch (e) {
            res.status(403).json({error: e.message})
        }
    }
    static async upsertAttendance(req, res, next){
        const {program_id, attendances, date} = req.body
        try{
            //build array of kid_id
            const kidsObject = {}
            for(const attendance of attendances){
                kidsObject[attendance.kid_id] = 1
            }
            const kids = []
            for(const key in kidsObject){
                kids.push(ObjectId(key))
            }

            let kidFilter = {
                _id: {
                    "$in": kids
                }
            }

            // //ensure that all kids exist
            // const kid = await Kid.find(kidFilter)
            // //ensure every kid exists
            // if(!kid || kid.length!==kids.length){
            //     res.status(404).json({error: "invalid kid!"})
            // }

            // //validate all kid is enrolled in program
            // const program_filter = {
            //     _id: ObjectId(program_id),
            //     kids: {"$all": kids}
            // }
            
            // const program = await Program.findOne(program_filter)
            // if(!program){
            //     return res.status(404).json({error: "invalid program to post attendance!"})
            // }

            //get program
            const program_filter = {
                _id: ObjectId(program_id)
            }
            
            const program = await Program.findOne(program_filter)

            //check attendance date is valid
            let matchOneDate = false
            for(const programDate of program.schedule){
                if(new Date(programDate).getTime()===new Date(date).getTime()){
                    matchOneDate = true
                    break
                }
            }
            if(!matchOneDate)
                return res.status(404).json({error: "date has no class in session!"})

            const document = {
                program_id: program_id,
                date: new Date(date),
                // attendance: attendances
            }
            
            // const attendance = new Attendance(document)
            
            //insert new document
            let result = await Attendance.updateOne(document, {"$set": {attendance: attendances}}, {upsert: true})

            res.json({result: result})
            // attendance.save()
            // .catch(()=>{throw new Error("error saving attendance in post attendance")})
            
            // res.json({status:"success", attendance: attendance})

        }catch(e){
            res.status(404).json({error: e.message})
        }
    }   
}
