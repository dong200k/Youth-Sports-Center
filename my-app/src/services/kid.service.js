import axios from "axios"

class KidService{
    constructor(){
        this.baseURL = "http://localhost:5000/api/v1/youthsportcenter"
    }
    addKid(data){
        return axios.post(this.baseURL + "/kid", data) 
    } 
    updateKid(data){
        return axios.put(this.baseURL + "/kid", data)
    }
    getKids(id){
        return axios.get(this.baseURL + "/kid/"+id)
    }
    deleteKid(data){
        return axios.delete(this.baseURL + "/kid", {data:data})
    } 
}

export default new KidService()