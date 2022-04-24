import { ObjectId } from "mongodb";
import Program from "../models/Program.js"
import Kid from "../models/Kid.js"
import Attendance from "../models/Attendance.js";

export default class AttendanceController{
    //post attendance
    static async postAttendance(req, res, next){
        const {kid_id, program_id, attended, notes, date, parent_id} = req.body
        try{

            const kid = await Kid.findById(ObjectId(kid_id))

            //filter for parent of kid
            const parent_filter = {
                _id: ObjectId(parent_id),
                kids: ObjectId(kid_id),
                user_type: "Parent"
            }
            //ensure kid exists and parent is valid
            if(!kid || !User.findOne(parent_filter)){
                res.status(404).json({error: "invalid kid or no permission to enroll!"})
            }

            //validate kid is enrolled in program
            const program_filter = {
                _id: ObjectId(program_id),
                kids: ObjectId(kid_id)
            }

            const program = await Program.findOne(program_filter)
            if(!program){
                res.status(404).json({error: "invalid program to post attendance!"})
            }

            //new attendance
            doc = {
                kid_id : kid_id,
                program_id : program_id,
                attended: attended,
                notes: notes,
                date: date
            }

            const attendance = Attendance(doc)
            
            attendance.save()
            .catch(()=>{throw new Error("error saving attendance in post attendance")})
            res.json({status:"success", attendance: attendance})

        }catch(e){
            res.status(404).json({error: e.message})
        }
    }
    static async getAttendance(req, res, next){
        const{date, program_id} = req.query

        try {
            let filter = {
                program_id: program_id,
                date: new Date(date)
            }
            const attendance = await Attendance.findOne(filter)

            if(!attendance)
                res.json({status:"not found"})
            else{
                console.log(attendance)
                const attendanceWithNames = attendance.attendance
                
                //get program to take attendance for
                const program = await Program.findById(ObjectId(program_id))
                if(!program)
                    throw new Error("invalid program")
                
                //get kids in program and their name
                let filter = {
                    _id: {"$in": program.kids.map(kid=>ObjectId(kid))}
                }
                const kids = await Kid.find(filter)
                if(kids.length!==program.kids.length)
                    throw new Error("error in attendance, could not retrieve all kids in program")
            
                for(const i in attendanceWithNames){
                    //get kid for ith attendance(kid_id, attended boolean)
                    let ithKid = kids.find(kid=>kid._id.toString()===attendanceWithNames[i].kid_id.toString())
                    //write their name to the attendance with names
                    attendanceWithNames[i].name = ithKid.first_name + " "+ ithKid.last_name
                }

                res.json({status: "success", attendance: attendanceWithNames})
            }
        } catch (e) {
            res.status(403).json({error: e.message})
        }
    }
    static async upsertAttendance(req, res, next){
        const {program_id, attendances, date} = req.body
        try{

            for(const attendance of attendances){
                let kid_id = attendance.kid_id
                const kid = await Kid.findById(ObjectId(kid_id))
    
                //ensure kid exists
                if(!kid){
                    res.status(404).json({error: "invalid kid!"})
                }

                //validate kid is enrolled in program
                const program_filter = {
                    _id: ObjectId(program_id),
                    kids: ObjectId(kid_id)
                }

                const program = await Program.findOne(program_filter)
                if(!program){
                    res.status(404).json({error: "invalid program to post attendance!"})
                }
            }

            const document = {
                program_id: program_id,
                date: new Date(date),
                // attendance: attendances
            }
            
            // const attendance = new Attendance(document)

            //insert new document
            let result = await Attendance.updateOne(document, {"$set": {attedance: attendances}}, {upsert: true})

            console.log(result.n)
            res.json({result: result})
            // attendance.save()
            // .catch(()=>{throw new Error("error saving attendance in post attendance")})
            
            // res.json({status:"success", attendance: attendance})

        }catch(e){
            res.status(404).json({error: e.message})
        }
    }
}
