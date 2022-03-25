//handles all routing logic for the project
import express, { Router } from "express"
import AnnouncementController from "../controller/announcement.controller.js"
import KidController from "../controller/kid.controller.js"
import ProgramController from "../controller/program.controller.js"
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
router
    .route("/announcement/user/:id")
    .get(AnnouncementController.getUserAnnouncement)
//programs
router 
    .route("/program")
    .post(ProgramController.postProgram)
    .put(ProgramController.updateProgram)
    .get(ProgramController.getProgram)
    .delete(ProgramController.deleteProgram)
router
    .route("/program/enroll")
    .post(ProgramController.enrollKid)
router
    .route("/program/drop")
    .put(ProgramController.dropKidsProgram)
router 
    .route("/program/user_programs")
    .get(ProgramController.getUserProgram)

//messages

//kids
router
    .route("/kid")
    .post(KidController.addKid)
    .get(KidController.getKids)
    .put(KidController.updateKid)
    .delete(KidController.deleteKid)
//instructors
router
    .route("/instructor")
    .get(UserController.getInstructors)
export default router

