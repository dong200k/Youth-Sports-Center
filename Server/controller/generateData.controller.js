import Program from "../models/Program.js"
import User from "../models/User.js"
import Kid from "../models/Kid.js"
import { ObjectId } from "mongodb"
import UserController from "./user.controller.js"
import names from "../randomData/randomNames.js"
import randomParagraphs from "../randomData/randomParagraphs.js"
import AnnouncementDao from "../dao/announcementDAO.js"
import locations from "../randomData/randomLocations.js"

export default class GenerateData{
    static async generatePrograms(req, res, next){
        //generate n random programs
        let {n} = req.body
        if(!n||typeof(n)!==typeof(1123)) n = 5
        let count = 0
        const programs = []
        const instructors = await GenerateData.getInstructors()
        console.log(instructors)
        for(let i=0;i<n;i++){
            try {
                let program = await GenerateData.generateOneProgram(instructors)
                if(program){
                    programs.push(program)
                    count++
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        res.json({programs: programs, count: count})
    }
    static async generateOneProgram(instructors){
        console.log("in one program")
        const names = ["Club", "Meet", "Association", "Group", "Alliance", "Guild", "Band", "Crew", "Troupe", "Society"]
        const letters = ["A", "B", "C", "D", "E", "F", "W"]
        const numbers = ["100", "200", "300", "400", "500"]
        const sport_types = ["Soccer", "Basketball", "Football", "Badminton", "Handball", "Volleyball", "Tennis", "Baseball"]
        // const locations = [""]
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        
        //generate random sport
        const sport = GenerateData.selectRandom(sport_types) 

        //generate 1-7 days
        const filter = (arr, excluded)=>{
            return arr.filter(val=>val!==excluded)
        }
        const randomDays = []
        let remainingDays = [...days]
        let d = Math.floor(Math.random()*7)+1
        for(let i=0;i<d;i++){
            let day = GenerateData.selectRandom(remainingDays)
            remainingDays = filter(remainingDays, day)
            randomDays.push(day)
        }

        //generate ages
        let lower = Math.floor(Math.random()*16+1)
        const ages = []
        for(let i=lower;i<lower+5;i++){
            ages.push(i)
        }

        //generate program name
        const program_name = sport + " " + GenerateData.selectRandom(names) + " " + GenerateData.selectRandom(numbers) + " " + GenerateData.selectRandom(letters)

        const dates = [{start_date: "1/28/2022", end_date: "5/30/2022"}, 
                        {start_date: "5/31/2022", end_date: "8/14/2022"},
                        {start_date: "8/15/2022", end_date: "12/21/2022"}]

        //generate time
        let date = GenerateData.selectRandom(dates)
        const time = {}
        time.start_date = new Date(date.start_date)
        time.end_date = new Date(date.end_date)
        time.start_time = Math.floor(Math.random()*134)*10
        time.end_time = time.start_time + 60 + Math.floor(Math.random()*5)*10

        //1-3 instructors
        const coaches = []
        let instructorNum = Math.floor(Math.random()*3+1)
        let remainingInstructors = [...instructors]
        for(let i=0;i<instructorNum;i++){
            if(remainingInstructors.length<=0)
                break
            let instructor =  GenerateData.selectRandom(remainingInstructors)
            coaches.push(instructor)
            remainingInstructors = filter(remainingInstructors, instructor)
        }

        let dayDict = {}
        const daysToUSe = []
        for(const day of randomDays){
            dayDict[day] = day
        }
        for(const day of days){
            if(dayDict[day]){
                daysToUSe.push(day)
            }
        }

        const new_program = {
            program_name: program_name,
            sport_type: sport, 
            location: GenerateData.selectRandom(locations), 
            days: daysToUSe,
            ages: ages,
            capacity: Math.floor(Math.random()*31+10), 
            waitlist_capacity: Math.floor(Math.random()*16),  
            time:time,
            instructors: coaches.map(instructor=>ObjectId(instructor._id))
        }

        const program = Program(new_program)

        //generate schedule 
        const schedule = program.generateSchedule(program)
        program.schedule = schedule

        await program.save(err=>{
            if(err){
                return null
            }
            return program
        })
    }
    static selectRandom(arr){
        //0-arr.length-1
        let chosen = Math.floor(Math.random()*arr.length)
        return arr[chosen]
    }
    static async getInstructors(){
        const instructor_filter = {
            user_type: "Instructor"
        }
        //take only the _id and names
        const projection = {
            first_name: 1
        }
        const instructors = await User.find(instructor_filter, projection)
        return instructors
    }
    static async generateAnnouncements(req, res, next){//for 1 program
        let {program_id, n} = req.body
        if(!n||typeof(n)!==typeof(1123)) n = 5
        let program = await Program.findById(ObjectId(program_id))
        if(!program)
            res.status(404).json({error:"announcements can only be made for non null programs!!!"})
        let titles = ["Course update", "New announcement", "Title", "Lorem Ipsum", "Course canceled!!!", "About refunds"]
        let count = 0
        for(let i=0;i<n;i++){
            let {error} = AnnouncementDao.createAnnouncement(
                program.instructor_id, 
                program.program_id, 
                GenerateData.selectRandom(randomParagraphs), 
                GenerateData.selectRandom(titles)
            )
            if(!error)
                count++
        }
        res.json({count:count, announcements: await AnnouncementDao.getProgramAnnouncement(program_id)})
    }
    static async generateInstructors(req, res, next){
        let {n} = req.body
        if(!n||typeof(n)!==typeof(1123)) n = 5
        const emails = ["@gmail.com", "@citymail.cuny.edu", "@yahoo.com", "@hotmail.com"]
        let instructors = new instructors
        let result = {instructors: []}
        let myres = {
            json: (json) =>{
                result.instructors.append(json)
            }
        }
        for(let i=0;i<n;i++){
            let first_name = GenerateData.selectRandom(names)
            let num  = Math.floor(Math.random()*1000+100).toString()
            let req = {
                body:{
                    first_name: first_name, 
                    // last_name, 
                    email: first_name + num + GenerateData.selectRandom(emails), 
                    password: "hello", 
                    user_type:"Instructor",
                }
            }
            try {
                UserController.Register(req, myres, next)
            } catch (error) {
                // res.json({error:error.message})
                console.log(error.message)
            }
        }
        
        res.json(result)
    }   
    static async generateParentsAndKid(req, res, next){

    }
    static async deletePrograms(req, res, next){
        try {
            
            const query = {
                program_name:{
                    "$nin": ["test program", "Program 123", "Program 420"]
                }
            }
            await Program.deleteMany(query)
            res.json({status:"success"})
        } catch (error) {
            res.status(404).json({error:error.message})
        }
    }

}