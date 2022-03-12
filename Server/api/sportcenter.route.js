//handles all routing logic for the project
import express from "express"
import AnnouncementController from "../controller/announcement.controller.js"
import KidController from "../controller/kid.controller.js"
import UserController from "../controller/user.controller.js"
const router = express.Router()

router.route("/").get((req,res)=>{
    res.send("hello world!")
})
//login
router
    .route("/login")
    .post(UserController.Login)
//register
router
    .route("/register")
    .post(UserController.Register)

//announcements
router
    .route("/announcement")
    .post(AnnouncementController.postAnnouncement)
    .put(AnnouncementController.updateAnnouncement)
    .get(AnnouncementController.getAllAnnouncement)
router
    .route("/announcement/id/:id")
    .get(AnnouncementController.getProgramAnnouncement)
//programs

//messages

//kids
router
    .route("/kid")
    .post(KidController.addKid)
    .get(KidController.getKids)
    .put(KidController.updateKid)
    .delete(KidController.deleteKid)
export default router

