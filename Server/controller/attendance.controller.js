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

            //attempt to enroll
            attendance.save(err=>{
                if(err){
                    throw new Error("error posting attendance!")
                }else{
                    res.json({status:"success", attendance: attendance})
                    return
                }
            })

        }catch(e){
            res.status(404).json({error: e.message})
        }
    }
}
