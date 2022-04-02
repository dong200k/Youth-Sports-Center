//handles all routing logic for the project
import express, { Router } from "express"
import AnnouncementController from "../controller/announcement.controller.js"
import KidController from "../controller/kid.controller.js"
import ProgramController from "../controller/program.controller.js"
import UserController from "../controller/user.controller.js"
import GenerateData from "../controller/generateData.controller.js"
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
    .delete(ProgramController.deleteProgram)
router
    .route("/program/filter")
    .post(ProgramController.getProgram)
router
    .route("/program/enroll")
    .post(ProgramController.enrollKid)
    .put(ProgramController.dropKidsProgram)
router 
    .route("/program/user/:id")
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

//users
router 
    .route("/user")
    .put(UserController.updateUser)
//generate random data
router
    .route("/generate/programs")
    .post(GenerateData.generatePrograms)
router
    .route("/generate/instructors")
    .post(GenerateData.generatePrograms)
router
    .route("/generate/announcements")
    .post(GenerateData.generateAnnouncements)
// router
//     .route("/generate/deleterandom")
//     .post(GenerateData.deletePrograms)
export default router

