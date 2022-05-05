import axios from "axios"
import baseURL from "./baseURL.js"
class AttendanceController{
    constructor(){
        // this.baseURL = "http://localhost:5000/api/v1/youthsportcenter"
        this.baseURL = baseURL
    }
    getAttendance(data){
        return axios.get(this.baseURL + "/attendance", {params: data})
    }
    upsertAttendance(data){
        return axios.post(this.baseURL + "/attendance", data)
    }
}

export default new AttendanceController()