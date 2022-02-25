import AnnouncementDao from "../dao/announcementDAO.js";

export default class AnnouncementController{
    static async apiUpdateAnnouncement(req, res, next){
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
    static async apiPostAnnouncement(req, res, next){
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
    static async apiGetProgramAnnouncement(req, res, next){//returns {announcements: []}
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
    static async apiGetAllAnnouncement(req, res, next){//returns {announcements: []}
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