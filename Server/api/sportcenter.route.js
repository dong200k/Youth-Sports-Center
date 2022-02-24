//handles all routing logic for the project
import express from "express"
import AnnouncementController from "./announcement.Controller.js"
const router = express.Router()

router.route("/").get((req,res)=>{
    res.send("hello world!")
})
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

//login


export default router

