import axios from "axios"
class AttendanceController{
    constructor(){
        this.baseURL = "http://localhost:5000/api/v1/youthsportcenter"
    }
    getAttendance(data){
        return axios.get(this.baseURL + "/attendance", {params: data})
    }
    upsertAttendance(data){
        return axios.post(this.baseURL + "/attendance", data)
    }
}

export default new AttendanceController()