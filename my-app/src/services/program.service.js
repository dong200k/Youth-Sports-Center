import axiosInstance from "axios"

class ProgramService{
    constructor(){
        this.baseURL = "http://localhost:5000/api/v1/youthsportcenter"
    }
    filterProgram(data){
        return axiosInstance.get(this.baseURL + "/program", data)
    }
    createProgram(data){
        return axiosInstance.post(this.baseURL + "/program", data)
    }
    updateProgram(data){
        return axiosInstance.put(this.baseURL + "/program", data)
    }
    deleteProgram(data){
        return axiosInstance.delete(this.baseURL + "/program", data)
    }
    getUserProgram(data){//get program based on user_id
        return axiosInstance.get(this.baseURL + "/program", data)
    }
    enrollKid(data){//enroll kid into program
        return axiosInstance.post(this.baseURL + "/program/enroll", data)
    }
    dropKid(data){//drop kid from program
        return axiosInstance.put(this.baseURL + "/program/enroll", data)
    }
}

export default new ProgramService()