import AnnouncementDao from "../dao/announcementDAO.js";

export default class AnnouncementController{
    static async updateAnnouncement(req, res, next){//returns {status: "success"} on success
        let {id, user_id, message, title} = req.body
        try{
            const date = new Date()
            let response = await AnnouncementDao.updateAnnouncement(id, user_id, message, title, date)
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
        let {sender_id, program_id, message, title} = req.body
        try{
            let {error} = await AnnouncementDao.createAnnouncement(sender_id, program_id, message, title)
            if(error){
                res.status(400).json({error})
                return
            }
            res.json({status: "success"})
        }catch (e) {
            res.status(500).json({ error: e.message })
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
        try{
            //get all announcements
            let announcements = await AnnouncementDao.getAllAnnouncement()
            res.json({announcements: announcements})
        }catch(e){
            console.log("unable to get all announcement!")
            //error return empty array of announcements
            res.json({announcements: []})
        }
    }
}