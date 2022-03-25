import { ObjectId } from "mongodb";
import AnnouncementDao from "../dao/announcementDAO.js";
import Program from "../models/Program.js";
import User from "../models/User.js";

export default class AnnouncementController{
    static async updateAnnouncement(req, res, next){//returns {status: "success"} on success
        let {_id, user_id, message, title} = req.body
        try{
            //grab instructor
            const filter = {
                _id: ObjectId(user_id),
                user_type: "Instructor"
            }
            const instructor = User.findOne(filter)

            if(!instructor){
                throw new Error("only instructors can update announcement")
            }

            const date = new Date()
            let response = await AnnouncementDao.updateAnnouncement(_id, user_id, message, title, date)
            //error with querying
            if(response.error){
                res.status(400).json({error})
                return 
            }
            //nothing updated   
            if (response.modifiedCount === 0) {
                throw new Error(
                  "unable to update review - user may not be original poster",
                )
            }
            res.json({status: "success"})
        }catch (e) {
            console.log("error in announcement controller")
            res.status(500).json({ error: e.message })
        }
    }
    static async postAnnouncement(req, res, next){//returns {status: "success"} on success
        let {user_id, program_id, message, title} = req.body
        try{
            if(!user_id||!program_id||!message||!title)
                throw new Error("All fields required")
            //filter to make sure user is instructor and exist
            const filter = {
                _id: ObjectId(user_id),
                user_type: "Instructor"
            }
            const instructor = await User.findOne(filter)

            if(!instructor){
                throw new Error("only instructors can post announcement")
            }

            //filter for program to make announcement for, which instructor must be apart of
            const program_filter = {
                _id: ObjectId(program_id),
                instructors: ObjectId(user_id)
            }
            const program = await Program.findById(program_filter)
            
            if(!program){
                throw new Error("invalid program to post announcement")
            }

            let {error} = await AnnouncementDao.createAnnouncement(user_id, program_id, message, title)
            if(error){
                res.status(400).json({error})
                return
            }
            res.json({status: "success"})
        }catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
    static async deleteAnnouncement(req, res, next){
        const {_id} = req.body
        try {
            const announcement = Ann
        } catch (e) {
            res.status(404).json({error: e.message})
        }
    }
    static async getProgramAnnouncement(req, res, next){//returns {announcements: []}, empty array if invalid or empty collection
        //extract program id from route
        let program_id = req.params.id
        try{
            //get announcements for the program
            let announcements = await AnnouncementDao.getProgramAnnouncement(program_id)
            res.json({announcements: announcements})
        }catch(e){
            console.log("unable to get announcement!")
            //error return empty array of announcements
            res.json({announcements: []})
        }
    } 
    static async getAllAnnouncement(req, res, next){//returns {announcements: []}, empty array if invalid or empty collection
        // const {user_id} = req.body
        try{
            // const filter = {
            //     _id: ObjectId(user_id),
            //     user_type: "Instructor"
            // }
            // const instructor = User.findOne(filter)

            // if(!instructor){
            //     throw new Error("only instructors can access this information!")
            // }
            //get all announcements
            let announcements = await AnnouncementDao.getAllAnnouncement()
            res.json({announcements: announcements})
        }catch(e){
            console.log("unable to get all announcement!")
            //error return empty array of announcements
            res.json({announcements: []})
        }
    }
    static async getUserAnnouncement(req, res, next){
        const {id: user_id} = req.params
        try {
            const user = await User.findById(ObjectId(user_id))
            if(!user){
                throw new Error("user not found!")
            }
            let announcement = []
            if(user.user_type==="Parent"){
                //get programs where parent's kid is enrolled
                const program_filter = {
                    kids: {
                        "$in": user.kids
                    }
                }
                const projection = {
                    _id: 1
                }
                const programs = await Program.find(program_filter, projection)

                //no program to get announcements so return []
                if(!programs){
                    res.json({status: "success", announcement: []})
                    return
                }
                console.log(programs)
                //get announcement for all the programs in the programs
                announcement = await AnnouncementDao.getParentAnnouncement(programs)

            }else if(user.user_type==="Instructor"){
                //get announcements instructor sent
                announcement = await AnnouncementDao.getInstructorAnnouncement(user._id)
            }

            res.json({status:"success", announcement: announcement})
        } catch (e) {
            res.status(404).json({error: e.message, annoucement: []})
        }
    }
}