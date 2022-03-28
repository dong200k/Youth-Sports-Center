import axios from "axios"

class ProgramService{
    constructor(){
        this.baseURL = "http://localhost:5000/api/v1/youthsportcenter"
    }
    filterProgram(data){
        // if(data)
            return axios.post(this.baseURL + "/program/filter", data)
        // else 
        //     return axios.post(this.baseURL + "/program/filter", {filter:{}})
    }
    createProgram(data){
        return axios.post(this.baseURL + "/program", data)
    } 
    updateProgram(data){
        return axios.put(this.baseURL + "/program", data)
    }
    deleteProgram(data){
        return axios.delete(this.baseURL + "/program", data)
    }
    getUserProgram(id){//get program based on user_id
        // console.log(id+"adjasnasjdsajasn")
        return axios.get(this.baseURL + "/program/user/"+id)
    }
    enrollKid(data){//enroll kid into program
        return axios.post(this.baseURL + "/program/enroll", data)
    }
    dropKid(data){//drop kid from program
        return axios.put(this.baseURL + "/program/enroll", data)
    }
}

export default new ProgramService()