//handles all routing logic for the project
import express from "express"
import AnnouncementController from "../controller/announcement.controller.js"
const router = express.Router()

router.route("/").get((req,res)=>{
    res.send("hello world!")
})
//login


//announcements
router
    .route("/announcement")
    .post(AnnouncementController.apiPostAnnouncement)
    .put(AnnouncementController.apiUpdateAnnouncement)
    .get(AnnouncementController.apiGetAllAnnouncement)
router
    .route("/announcement/id/:id")
    .get(AnnouncementController.apiGetProgramAnnouncement)
//programs

//messages

//kids



export default router

